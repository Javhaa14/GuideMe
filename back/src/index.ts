import express, { json, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import QRcode from "qrcode";
import { v4 } from "uuid";
import OpenAI from "openai";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { postRouter } from "./routes/post";
import { connectMongoDB } from "./connectDB";
import { touristRouter } from "./routes/touristProfile";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
import { commentRouter } from "./routes/comments";
import { guideRouter } from "./routes/guideProfile";
import { Onlinerouter } from "./routes/online";
import tripPlanRouter from "./routes/tripPlan";
import { Notifrouter } from "./routes/notificationSMS";
import { Notification } from "./model/notification";
import { Bookingrouter } from "./routes/tripbook";
import { wishlistRouter } from "./routes/wish";
import { Chatrouter } from "./routes/chat";
import { getChatHistoryByRoomId, saveChatMessage } from "./controller/chat";

// Import your chat controllers

declare module "socket.io" {
  interface Socket {
    userId?: string;
    currentRoom?: string;
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
app.use("/wishlist", wishlistRouter);
app.use("/chat", Chatrouter);

////////////////////////////////////////////////////////////////
// QR Payment system using Socket.IO
const paymentWatchers: Record<string, Set<string>> = {};

app.get("/", async (_req: Request, res: Response) => {
  const id = v4();
  const baseUrl = "https://guideme-8o9f.onrender.com";

  const qr = await QRcode.toDataURL(`${baseUrl}/scanqr?id=${id}`);

  res.send({ qr, id });
});

app.get("/scanqr", (req, res: any) => {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).send("Missing or invalid id");
  }

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

  // QR payment watchers logic (unchanged)
  socket.on("watchPayment", (paymentId: string) => {
    if (!paymentWatchers[paymentId]) paymentWatchers[paymentId] = new Set();
    paymentWatchers[paymentId].add(socket.id);
    console.log(`Socket ${socket.id} is watching payment ${paymentId}`);
  });

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
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });

  // AI Chatbot logic (unchanged)
  socket.on("ai chatbot", async (msg: string) => {
    chatHistory.push({ role: "user", content: msg });

    const systemMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
      role: "system",
      content: `
You are an AI assistant for the GuideMe website. 
Only provide information related to travel, destinations, hotels, transportation, and travel tips relevant to the GuideMe platform.
Detect language and respond accordingly.
If unrelated question, respond: "I'm here to help only with travel-related questions on GuideMe."`,
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

  // User identification & room joining
  socket.on("identify", (userId) => {
    socket.data.userId = userId;
    socket.join(userId);
    console.log(`✅ Socket ${socket.id} identified as user ${userId}`);
  });

  socket.on("joinNotificationRoom", (userId: string) => {
    socket.join(`notify_${userId}`);
    console.log(`🔔 User ${userId} joined notify_${userId}`);
  });

  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    socket.data.currentRoom = roomId;
    console.log(`👥 Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("leaveRoom", (roomId: string) => {
    socket.leave(roomId);
    delete socket.data.currentRoom;
    console.log(`🚪 Socket ${socket.id} left room ${roomId}`);
  });

  socket.on("markNotificationsSeen", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) return;
    io.to(`notify_${receiverId}`).emit("notificationsSeen", { senderId });
  });

  // Handle chat message using your controller
  socket.on("chat message", async (msg) => {
    try {
      // Just broadcast to the room. Don't save in DB here.
      io.to(msg.roomId).emit("chat message", msg);

      // Notify recipient if they are not in the room
      const participants = msg.roomId.split("-");
      const recipientId = participants.find((id: string) => id !== msg.userId);

      if (recipientId) {
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
        }
      }
    } catch (err) {
      console.error("❌ Failed to process chat message:", err);
    }
  });

  // Add socket events for the other controllers as needed
  // For example: fetching chat history
  // socket.on("getChatHistory", async ({ roomId }) => {
  //   if (!roomId) {
  //     return socket.emit("error", "Missing roomId");
  //   }
  //   try {
  //     const messages = await getChatHistoryByRoomId(roomId);
  //     socket.emit("chatHistory", { roomId, messages });
  //   } catch (err) {
  //     console.error("❌ Error fetching chat history:", err);
  //     socket.emit("error", "Failed to get chat history");
  //   }
  // });

  // // Mark messages seen event
  // socket.on("markMessagesSeen", async ({ roomId, userId }) => {
  //   if (!roomId || !userId) return;

  //   try {
  //     await markMessagesSeen(roomId, userId);
  //     io.to(roomId).emit("messagesSeen", { roomId, userId });
  //   } catch (err) {
  //     console.error("❌ Error marking messages seen:", err);
  //   }
  // });

  // // Delete chat message event
  // socket.on("deleteChatMessage", async ({ messageId, roomId }) => {
  //   if (!messageId || !roomId) return;

  //   try {
  //     await deleteChatMessage(messageId);
  //     io.to(roomId).emit("chatMessageDeleted", { messageId });
  //   } catch (err) {
  //     console.error("❌ Error deleting chat message:", err);
  //   }
  // });

  // // Get chat rooms for user
  // socket.on("getChatRooms", async ({ userId }) => {
  //   if (!userId) return;

  //   try {
  //     const rooms = await getChatRoomsForUser(userId);
  //     socket.emit("chatRooms", rooms);
  //   } catch (err) {
  //     console.error("❌ Error getting chat rooms:", err);
  //   }
  // });

  // // Start or get chat room
  // socket.on("startOrGetChatRoom", async ({ userA, userB }) => {
  //   if (!userA || !userB) return;

  //   try {
  //     const room = await startOrGetChatRoom(userA, userB);
  //     socket.emit("chatRoom", room);
  //   } catch (err) {
  //     console.error("❌ Error starting or getting chat room:", err);
  //   }
  // });
});

export { io };

////////////////////////////////////////////////////////////////
// Connect DB & Start server
connectMongoDB();

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
