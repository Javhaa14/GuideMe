// routes/chat.ts or controller
import { Request, Response } from "express";
import { ChatMessageModel } from "../model/ChatHistory";

export const saveChatMessage = async (req: Request, res: Response) => {
  try {
    const { user, text, profileImage, roomId } = req.body;
    const newMessage = await ChatMessageModel.create({
      user,
      text,
      profileImage,
      roomId,
    });

    // Optionally emit via Socket.IO here if you want server to broadcast
    // io.emit("chat message", newMessage);

    res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    console.error("Failed to save chat message", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// Get chat history for a room
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const history = await ChatMessageModel.find({ roomId }).sort({
      timestamp: 1,
    });
    res.json({ success: true, messages: history });
  } catch (err) {
    console.error("Error fetching chat history", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
