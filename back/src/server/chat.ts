import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
 
const app = express();
const httpServer = createServer(app);
 
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Next.js origin
    methods: ['GET', 'POST'],
  },
});
 
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);
 
  socket.on('chat message', (msg: string) => {
    io.emit('chat message', msg);
  });
 
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});
 
httpServer.listen(4000, () => {
  console.log('🚀 Socket.io server running on http://localhost:4000');
});