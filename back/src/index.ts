import express, { json } from "express";
import dotenv from "dotenv";
import QRcode from "qrcode";
import cors from "cors";
import { v4 } from "uuid";
import { createServer } from "http";
import { Server } from "socket.io";
import { WebSocketServer, WebSocket } from "ws";
const app = express();
const port = process.env.PORT || 9999;
let qrs: Record<string, boolean> = {};
let clients: Record<string, WebSocket> = {};
app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", async (req, res) => {
  const id = v4();

  const qr = await QRcode.toDataURL(`http://localhost:${port}/scanqr?id=${id}`);
  qrs[id] = false;
  console.log(qrs, "hhh");

  res.send({ qr, id });
});
app.get("/scanqr", (req, res) => {
  const { id }: any = req.query;
  qrs[id] = true;

  // ✅ Check if WebSocket client exists and is open
  const client = clients[id];
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({ status: true }));
  }

  console.log("QR scanned:", id);
  res.send("qr scanned");
});

const server = app.listen(port, () => {
  console.log(`running at  http://localhost:${port}/`);
});

const ws = new WebSocketServer({ server });

ws.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (value) => {
    const message = JSON.parse(value.toString());
    if (message.type === "watch" && message.paymentId) {
      clients[message.paymentId] = socket;
      console.log("Registered watcher:", message.paymentId);
    }
  });

  socket.send(JSON.stringify({ message: "success", clients }));
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Next.js origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("chat message", (msg: string) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

httpServer.listen(4000, () => {
  console.log("🚀 Socket.io server running on http://localhost:4000");
});
