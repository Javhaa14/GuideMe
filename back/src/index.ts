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
import { ChatMessageModel } from "./model/ChatHistory";
import tripPlanRouter from "./routes/tripPlan";
import { Notifrouter } from "./routes/notificationSMS";
import { Notification } from "./model/notification";
import { Bookingrouter } from "./routes/tripbook";
import { wishlistRouter } from "./routes/wish";
import { NotificationRouter } from "./routes/Notif";

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
app.use("/notif", Notifrouter);
app.use("/bookings", Bookingrouter);
app.use("/wishlist", wishlistRouter);
app.use("/notification", NotificationRouter);

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
  let chatHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  // QR Watcher
  socket.on("watchPayment", (paymentId: string) => {
    if (!paymentWatchers[paymentId]) paymentWatchers[paymentId] = new Set();
    paymentWatchers[paymentId].add(socket.id);
    console.log(`Socket ${socket.id} is watching payment ${paymentId}`);
  });

  // Identify user and join rooms
  socket.on("identify", (userId) => {
    socket.data.userId = userId;
    socket.join(userId);
    console.log(`✅ Socket ${socket.id} identified as user ${userId}`);
  });

  socket.on("joinNotificationRoom", (userId: string) => {
    socket.join(`notify_${userId}`);
    console.log(`🔔 User ${userId} joined notify_${userId}`);
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    socket.data.currentRoom = roomId;
    console.log(`👥 Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    delete socket.data.currentRoom;
    console.log(`🚪 Socket ${socket.id} left room ${roomId}`);
  });

  socket.on("markNotificationsSeen", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) return;
    io.to(`notify_${receiverId}`).emit("notificationsSeen", { senderId });
  });

  // AI chatbot
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

  // Chat messaging
  socket.on("chat message", async (msg) => {
    console.log("📩 Message received:", msg);
    try {
      const savedMessage = await ChatMessageModel.create({
        user: msg.user,
        userId: msg.userId,
        text: msg.text,
        profileimage: msg.profileimage,
        roomId: msg.roomId,
      });

      io.to(msg.roomId).emit("chat message", savedMessage);

      const [userA, userB] = msg.roomId.split("-");
      const recipientId = msg.userId === userA ? userB : userA;

      await Notification.create({
        sender: msg.userId,
        receiver: recipientId,
        messageId: savedMessage._id,
        roomId: msg.roomId,
        seen: false,
      });

      const recipientSocket = [...io.sockets.sockets.values()].find(
        (s) => s.data?.userId === recipientId
      );

      const isViewingChat = recipientSocket?.data?.currentRoom === msg.roomId;

      if (!isViewingChat && recipientId !== msg.userId) {
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
    } catch (error) {
      console.error("❌ Error handling chat message:", error);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    chatHistory = [];

    for (const [paymentId, watchers] of Object.entries(paymentWatchers)) {
      if (watchers.has(socket.id)) {
        watchers.delete(socket.id);
        console.log(`🧹 Removed socket ${socket.id} from payment ${paymentId}`);
        if (watchers.size === 0) {
          delete paymentWatchers[paymentId];
        }
      }
    }

    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});
io.on("connection", (socket) => {
  console.log("🔌 New client connected");

  socket.on("joinNotificationRoom", (userId: string) => {
    socket.join(`notify_${userId}`);
    console.log(`✅ User ${userId} joined notify_${userId}`);
  });
});
// Start the server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on`);
});
export { io };
