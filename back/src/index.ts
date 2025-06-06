import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { Server as SocketIOServer } from "socket.io";
import QRcode from "qrcode";
import { v4 } from "uuid";
import OpenAI from "openai";
import dotenv from "dotenv";
import { postRouter } from "./routes/post";
import { connectMongoDB } from "./connectDB";
import { touristRouter } from "./routes/touristProfile";
import { userRouter } from "./routes/user";
import { tripPlanRouter } from "./routes/tripPlan";
import { authRouter } from "./routes/auth";

import cookieParser from "cookie-parser";
import { commentRouter } from "./routes/comments";
import { guideRouter } from "./routes/guideProfile";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
connectMongoDB();
app.use(json());
app.use(
  cors({
    origin: "https://guide-mee.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/post", postRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/tripPlan", tripPlanRouter);
app.use("/comment", commentRouter);
app.use("/gprofile", guideRouter);
app.use("/tprofile", touristRouter);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// QR System
let qrs: Record<string, boolean> = {};
let clients: Record<string, WebSocket> = {};

app.get("/", async (req, res) => {
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

// Use a single HTTP server
const httpServer = createServer(app);

// WebSocket for QR scan
const ws = new WebSocketServer({ server: httpServer });
ws.on("connection", (socket) => {
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Socket.IO for Chat
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "https://guide-mee.vercel.app", // Replace with real frontend
    methods: ["GET", "POST"],
  },
});

// Run server
httpServer.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
Nad it can be in any language first detect which language is it then check.
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

  // 2. User-to-User Chat
  socket.on("chat message", (msg: string) => {
    // You can customize this with rooms, sender ID, etc.
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    chatHistory = [];
  });
});
