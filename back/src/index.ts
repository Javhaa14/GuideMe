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
import { Notifrouter } from "./routes/notificationSMS";
import { Notification } from "./model/notification";
import { Bookingrouter } from "./routes/tripbook";
declare module "socket.io" {
  interface Socket {
    userId?: string;
  }
}
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
app.use("/notif", Notifrouter);
app.use("/bookings", Bookingrouter);

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
app.get("/scanqr", (req, res: any) => {
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
        socket.emit("paymentStatus", { paymentId: id, status: true });
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
        console.log(
          `Socket ${socket.id} removed from watching payment ${paymentId}`
        );
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
  socket.on("identify", (userId) => {
    socket.data.userId = userId;
    socket.join(userId); // Optional: join a personal room by userId
    console.log(`✅ Socket ${socket.id} identified as user ${userId}`);
  });

  // Join notification room
  socket.on("joinNotificationRoom", (userId: string) => {
    socket.join(`notify_${userId}`);
    console.log(`🔔 User ${userId} joined notify_${userId}`);

    // Debug: List all socket rooms
    setTimeout(() => {
      console.log(`🧠 Socket ${socket.id} rooms:`, [...socket.rooms]);
    }, 1000); // wait a sec to allow join
  });

  // Join chat room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    socket.data.currentRoom = roomId;
    console.log(`👥 Socket ${socket.id} joined room ${roomId}`);
  });

  // Leave chat room
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`🚪 Socket ${socket.id} left room ${roomId}`);
  });
  socket.on("markNotificationsSeen", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) return; // avoid undefined values
    io.to(`notify_${receiverId}`).emit("notificationsSeen", { senderId });
  });

  // Handle incoming chat message
  socket.on("chat message", async (msg) => {
    console.log("📩 Message received:", msg);

    try {
      // Save message to DB (replace with your DB code)
      const savedMessage = await ChatMessageModel.create({
        user: msg.user,
        userId: msg.userId,
        text: msg.text,
        profileimage: msg.profileimage,
        roomId: msg.roomId,
        // timestamp will be added automatically
      });

      if (!savedMessage) {
        throw new Error("Failed to save message");
      }

      // Emit message to the chat room
      io.to(msg.roomId).emit("chat message", savedMessage);

      // Determine recipient userId
      const [userA, userB] = msg.roomId.split("-");
      const recipientId = msg.userId === userA ? userB : userA;

      // Save notification in DB (replace with your DB code)
      await Notification.create({
        sender: msg.userId,
        receiver: recipientId,
        messageId: savedMessage._id,
        roomId: msg.roomId,
        seen: false,
      });

      // Find recipient's socket to check current room
      const recipientSocket = [...io.sockets.sockets.values()].find(
        (s) => s.data?.userId === recipientId
      );

      const isViewingChat = recipientSocket?.data?.currentRoom === msg.roomId;

      console.log(`Checking if should notify recipient ${recipientId}`);
      console.log(`Is viewing chat: ${isViewingChat}`);
      console.log(`Is sender: ${recipientId === msg.userId}`);

      if (!isViewingChat && recipientId !== msg.userId) {
        console.log(`📣 Emitting to notify_${recipientId}`);
        io.to(`notify_${recipientId}`).emit("notify", {
          title: "New Message",
          message: `${msg.user} sent you a message`,
          roomId: msg.roomId,
          senderId: msg.userId,
          type: "message",
        });
      } else {
        console.log("🔕 No notification sent (user is in room or is sender)");
      }
    } catch (err) {
      console.error("❌ Failed to process chat message:", err);
    }
  });

  // Handle disconnect cleanup if needed
  socket.on("disconnect", () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
    // You can remove socket from any tracking str
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
