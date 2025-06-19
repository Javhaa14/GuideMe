import express from "express";
import {
  deleteChatMessage,
  getChatHistoryByRoomId,
  getChatRoomsForUser,
  markMessagesSeen,
  saveChatMessage,
  startOrGetChatRoom,
} from "../controller/chat";

export const Chatrouter = express.Router();
Chatrouter.post("/", saveChatMessage as any)
  .get("/history/:roomId", getChatHistoryByRoomId as any)
  .post("/mark-seen", markMessagesSeen as any)
  .delete("/delete", deleteChatMessage as any)
  .get("/rooms/:userId", getChatRoomsForUser as any)
  .post("/start-or-get", startOrGetChatRoom as any);
