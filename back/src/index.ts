// Core & 3rd-party imports
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

// Local imports
import { postRouter } from "./routes/post";
import { connectMongoDB } from "./connectDB";
import { touristRouter } from "./routes/touristProfile";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
import { commentRouter } from "./routes/comments";
import { guideRouter } from "./routes/guideProfile";
import { Onlinerouter } from "./routes/online";
import tripPlanRouter from "./routes/tripPlan";
import { Bookingrouter } from "./routes/tripbook";
import { wishlistRouter } from "./routes/wish";
import { Chatrouter } from "./routes/chat";
// Extend Socket.IO with custom data
declare module "socket.io" {
  interface Socket {
    any: {
      userId?: string;
      currentRoom?: string;
    };
  }
}

dotenv.config();
connectMongoDB(); // Important: ensure DB is connected

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
const httpServer = createServer(app);

const allowedOrigins = [
  "https://guide-mee.vercel.app",
  "http://localhost:3000",
];

// Middlewares
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());

// Routers
app.use("/post", postRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/tripPlan", tripPlanRouter);
app.use("/comment", commentRouter);
app.use("/gprofile", guideRouter);
app.use("/tprofile", touristRouter);
app.use("/api", Onlinerouter);
app.use("/bookings", Bookingrouter);
app.use("/wishlist", wishlistRouter);
app.use("/chat", Chatrouter);

// QR Payment system
const paymentWatchers: Record<string, Set<string>> = {};

// QR route
app.get("/", async (_req: Request, res: Response) => {
  const id = v4();
  const baseUrl = "https://guideme-8o9f.onrender.com";
  const qr = await QRcode.toDataURL(`${baseUrl}/scanqr?id=${id}`);
  res.send({ qr, id });
});

// Create and attach Socket.IO server
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

app.get("/scanqr", (req: Request, res: Response): any => {
  const { id } = req.query;
  if (typeof id !== "string")
    return res.status(400).send("Missing or invalid ID");

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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  // Store user info on socket
  let currentUserId: string | null = null;

  // Keep your AI chatbot logic *exactly* as it is:
  let chatHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  // QR Watcher - UNCHANGED
  socket.on("watchPayment", (paymentId: string) => {
    if (!paymentWatchers[paymentId]) paymentWatchers[paymentId] = new Set();
    paymentWatchers[paymentId].add(socket.id);
    console.log(`Socket ${socket.id} is watching payment ${paymentId}`);
  });

  // AI chatbot - UNCHANGED!
  socket.on("ai chatbot", async (msg: string) => {
    chatHistory.push({ role: "user", content: msg });

    const systemMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
      role: "system",
      content: `You are an AI assistant for the GuideMe website. Only provide information related to travel, destinations, hotels, transportation, and travel tips relevant to the GuideMe platform. Detect language and respond accordingly. If unrelated question, respond: "I'm here to help only with travel-related questions on GuideMe."`,
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

  socket.on("identify", (userId: string) => {
    socket.data.userId = userId;
    console.log(`User ${userId} identified`);
  });

  // Join room for real-time updates
  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Leave room
  socket.on("leaveRoom", (roomId: string) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  // Just broadcast messages - REST API handles saving!
  socket.on("broadcastMessage", (messageData: any) => {
    console.log("Broadcasting message to room:", messageData.roomId);

    // Just broadcast to others in the room - that's it!
    socket.to(messageData.roomId).emit("newMessage", messageData);
  });

  // Keep all your existing disconnect logic
  socket.on("disconnect", () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export { io };
