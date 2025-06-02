import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { Server as SocketIOServer } from "socket.io";
import QRcode from "qrcode";
import { v4 } from "uuid";
import { userRouter } from "./routes/user";
import { tripPlanRouter } from "./routes/TripPlan";

const app = express();
const port = process.env.PORT || 4000;

app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/tripPlan", tripPlanRouter);

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
    const message = JSON.parse(value.toString());
    if (message.type === "watch" && message.paymentId) {
      clients[message.paymentId] = socket;
    }
  });
});

// Socket.IO for Chat
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with real frontend
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ Chat user connected:", socket.id);

  socket.on("chat message", (msg: string) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Chat user disconnected:", socket.id);
  });
});

// Run server
httpServer.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
