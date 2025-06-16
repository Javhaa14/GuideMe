import express, { json, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import QRcode from "qrcode";
import { v4 } from "uuid";
import OpenAI from "openai";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";

import { postRouter } from "./routes/post";
import { connectMongoDB } from "./connectDB";
import { touristRouter } from "./routes/touristProfile";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
import { commentRouter } from "./routes/comments";
import { guideRouter } from "./routes/guideProfile";

import { Onlinerouter } from "./routes/online";
import { ChatMessageModel } from "./model/ChatHistory";
import tripPlanRouter from "./routes/tripPlan";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const allowedOrigins = [
  "https://guide-mee.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(json());
app.use(cookieParser());

app.use("/post", postRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/tripPlan", tripPlanRouter);
app.use("/comment", commentRouter);
app.use("/gprofile", guideRouter);
app.use("/tprofile", touristRouter);
app.use("/api", Onlinerouter);

////////////////////////////////////////////////////////////////
// QR Payment system using Socket.IO
// Map paymentId => Set of socket IDs watching that payment
const paymentWatchers: Record<string, Set<string>> = {};

// Endpoint to generate QR code for payment
app.get("/", async (_req: Request, res: Response) => {
  const id = v4();
  const baseUrl = "https://guideme-8o9f.onrender.com";

  const qr = await QRcode.toDataURL(`${baseUrl}/scanqr?id=${id}`);

  // Initialize the payment as not scanned yet (optional tracking)
  res.send({ qr, id });
});

// Endpoint called when QR code is scanned
app.get("/scanqr", (req, res:any) => {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).send("Missing or invalid id");
  }

  // Notify all watchers of this paymentId via Socket.IO
  const watchers = paymentWatchers[id];
  if (watchers) {
    watchers.forEach((socketId) => {
      const socket = io.sockets.sockets.get(socketId);
      if (socket) {
        socket.emit("paymentScanned", { paymentId: id, status: true });
      }
    });
  }

  res.send("QR scanned, watchers notified");
});

////////////////////////////////////////////////////////////////
// Create HTTP server and initialize Socket.IO
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

io.on("connection", (socket) => {
  let chatHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
  console.log(`🔌 Socket connected: ${socket.id}`);

  // --- QR payment watch handling ---

  // Client asks to watch a payment by id
  socket.on("watchPayment", (paymentId: string) => {
    if (!paymentWatchers[paymentId]) paymentWatchers[paymentId] = new Set();
    paymentWatchers[paymentId].add(socket.id);
    console.log(`Socket ${socket.id} is watching payment ${paymentId}`);
  });

  // When socket disconnects, remove from all payment watchers
  socket.on("disconnect", () => {
    chatHistory = [];

    for (const [paymentId, watchers] of Object.entries(paymentWatchers)) {
      if (watchers.has(socket.id)) {
        watchers.delete(socket.id);
        console.log(`Socket ${socket.id} removed from watching payment ${paymentId}`);
        if (watchers.size === 0) {
          delete paymentWatchers[paymentId];
        }
      }
    }
  });

  // --- AI Chatbot ---

  socket.on("ai chatbot", async (msg: string) => {
    chatHistory.push({ role: "user", content: msg });

    const systemMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
      role: "system",
      content: `
You are an AI assistant for the GuideMe website. 
Only provide information related to travel, destinations, hotels, transportation, and travel tips that are relevant to the GuideMe platform.
And it can be in any language—first detect which language it is, then respond accordingly.
If a question is unrelated (like programming, celebrities, or personal advice), respond with: 
"I'm here to help only with travel-related questions on GuideMe."`,
    };

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [systemMessage, ...chatHistory],
      });

      const aiMessage =
        completion.choices[0].message?.content ?? "Sorry, I can't answer that.";
      chatHistory.push({ role: "assistant", content: aiMessage });
      socket.emit("ai chatbot", aiMessage);
    } catch (error) {
      console.error("❌ OpenAI error:", error);
      socket.emit("ai chatbot", "Sorry, something went wrong.");
    }
  });

  // --- Chat room join ---
 socket.on("joinRoom", async (roomId: string) => {
  socket.join(roomId);
  socket.data.currentRoom = roomId; // 👈 track active room
  console.log(`Socket ${socket.id} joined room ${roomId}`);

  try {
    const recentMessages = await ChatMessageModel.find({ roomId })
      .sort({ timestamp: -1 })
      .limit(50)
      .exec();
    socket.emit("chat history", recentMessages.reverse());
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
});

socket.on("leaveRoom", (roomId: string) => {
  socket.leave(roomId);
  if (socket.data.currentRoom === roomId) {
    socket.data.currentRoom = null;
  }
  console.log(`Socket ${socket.id} left room ${roomId}`);
});

  // --- User-to-user chat messages ---
  socket.on("identify", (userId: string) => {
  socket.data.userId = userId;
  console.log(`📛 Socket ${socket.id} identified as user ${userId}`);
});

 socket.on("chat message", async (msg) => {
  try {
    const newMessage = await ChatMessageModel.create({
      user: msg.user,
      text: msg.text,
      profileImage: msg.profileImage,
      roomId: msg.roomId,
      timestamp: new Date(),
    });

    io.to(msg.roomId).emit("chat message", {
      ...newMessage.toObject(),
      tempId: msg.tempId,
    });

    console.log(`Message saved and emitted to room ${msg.roomId}`);

    // Determine recipient
    const [userA, userB] = msg.roomId.split("-");
    const recipientId = msg.userId === userA ? userB : userA;

    // Check if recipient is already viewing the chat
    const recipientSocket = [...io.sockets.sockets.values()].find(
      (s) => s.data?.userId === recipientId
    );

    const isViewingChat = recipientSocket?.data?.currentRoom === msg.roomId;

    if (!isViewingChat) {
      io.to(`notify_${recipientId}`).emit("notify", {
        title: "New Message",
        message: `${msg.user} sent you a message`,
        roomId: msg.roomId,
      });
    } else {
      console.log(`🔕 No notification sent — user ${recipientId} is already viewing chat`);
    }
  } catch (err) {
    console.error("Failed to save chat message:", err);
  }
});


  socket.on("joinNotificationRoom", (userId: string) => {
    socket.join(`notify_${userId}`);
    console.log(`🔔 User ${userId} joined notify_${userId}`);
  });

  socket.on("approveReset", async (data: { token: string }) => {
    try {
      const payload = jwt.verify(
        data.token,
        process.env.JWT_SECRET!
      ) as JwtPayload & { id: string };

      io.to(`reset_${payload.id}`).emit("resetApproved", {
        message: "Password reset approved!",
        userId: payload.id,
      });

      socket.emit("approveResult", {
        success: true,
        message: "Reset approved.",
      });
    } catch (err) {
      socket.emit("approveResult", {
        success: false,
        message: "Invalid or expired token.",
      });
    }
  });

  socket.on("leaveRoom", (roomId: string) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });
});

export { io };

////////////////////////////////////////////////////////////////
// Connect DB & Start server
connectMongoDB();

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
