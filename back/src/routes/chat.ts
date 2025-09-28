import { Router } from "express";
import {
  getChatHistory,
  getChatRoom,
  getUserChatRooms,
  markMessageAsSeen,
  sendMessage,
} from "../controller/chat";

export const Chatrouter = Router();

Chatrouter.post("/message", sendMessage);
Chatrouter.post("/room/get", (req, res, next) => {
  Promise.resolve(getChatRoom(req, res)).catch(next);
});

Chatrouter.patch("/message/seen", (req, res, next) => {
  Promise.resolve(markMessageAsSeen(req, res)).catch(next);
});
Chatrouter.get("/room/:roomId/history", (req, res, next) => {
  Promise.resolve(getChatHistory(req, res)).catch(next);
});
Chatrouter.get("/user/:userId/rooms", getUserChatRooms);
