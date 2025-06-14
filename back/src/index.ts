import express, { json, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
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
// QR System
let qrs: Record<string, boolean> = {};
let clients: Record<string, WebSocket> = {};

app.get("/", async (_req: Request, res: Response) => {
  const id = v4();
  const baseUrl = "https://guideme-8o9f.onrender.com";

  const qr = await QRcode.toDataURL(`${baseUrl}/scanqr?id=${id}`);
  qrs[id] = false;
  res.send({ qr, id });
});

app.get("/scanqr", (req, res) => {
  const { id }: any = req.query;
  qrs[id] = true;

  const client = clients[id];
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({ status: true }));
  }

  res.send("qr scanned");
});

////////////////////////////////////////////////////////////////
// Use a single HTTP server
const httpServer = createServer(app);

// WebSocket for QR scan
const ws = new WebSocketServer({ server: httpServer });

ws.on("connection", (socket: WebSocket) => {
  socket.on("message", (value) => {
    const str = value.toString();

    try {
      const message = JSON.parse(str);
      if (message.type === "watch" && message.paymentId) {
        clients[message.paymentId] = socket;
      }
    } catch (err) {
      console.log("Received non-JSON message:", str);
    }
  });
});

////////////////////////////////////////////////////////////////
// Socket.IO for Chat
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

io.on("connection", (socket) => {
  let chatHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  // 1. AI Chatbot
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

  // 1. Join room event
  socket.on("joinRoom", async (roomId: string) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);

    try {
      const recentMessages = await ChatMessageModel.find({ roomId })
        .sort({ timestamp: -1 })
        .limit(50)
        .exec();
      // Send recent messages in chronological order
      socket.emit("chat history", recentMessages.reverse());
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  });

  // 2. User-to-User Chat
  socket.on("chat message", async (msg) => {
    try {
      // Save message to DB
      const newMessage = await ChatMessageModel.create({
        user: msg.user,
        text: msg.text,
        profileImage: msg.profileImage,
        roomId: msg.roomId,
        timestamp: new Date(),
      });
      io.to(msg.roomId).emit("chat message", newMessage);
      console.log(`Message saved and emitted to room ${msg.roomId}`);

      const [userA, userB] = msg.roomId.split("-");
      const recipientId = msg.userId === userA ? userB : userA;

      io.to(`notify_${recipientId}`).emit("notify", {
        title: "New Message",
        message: `${msg.user} sent you a message`,
        roomId: msg.roomId,
      });
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

      // Emit event to this user's private room to notify approval
      io.to(`reset_${payload.id}`).emit("resetApproved", {
        message: "Password reset approved!",
        userId: payload.id,
      });

      // Optionally, update DB to mark token as used or approved

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

  socket.on("disconnect", () => {
    chatHistory = [];
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
