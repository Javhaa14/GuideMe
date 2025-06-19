// routes/chat.ts or controller
import { Request, Response } from "express";
import { ChatModel } from "../model/Chat";
import { ChathistoryModel } from "../model/ChatHistory";
import { Notification } from "../model/notification";
import { ChatRoomModel } from "../model/ChatRoom";
import { Types } from "mongoose";

export const saveChatMessage = async (req: Request, res: Response) => {
  try {
    const { user, receiver, text, profileimage, roomId } = req.body;

    if (!user || !receiver || !text || !roomId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // 1. Save chat message
    const newMessage = await ChatModel.create({
      user,
      text,
      profileimage,
      roomId,
    });

    // 2. Create notification for receiver
    await Notification.create({
      sender: user,
      receiver,
      message: text,
      seen: false,
    });

    // 3. Update or create chat history for this room
    // Example: upsert last message and timestamp for chat room
    await ChathistoryModel.findOneAndUpdate(
      { roomId },
      { lastMessage: text, lastUpdated: new Date() },
      { upsert: true }
    );

    res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    console.error("Failed to save chat message", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// Get chat history for a room
export const getChatHistoryByRoomId = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      return res
        .status(400)
        .json({ success: false, error: "Room ID is required" });
    }

    const history = await ChathistoryModel.find({ roomId }).sort({
      createdAt: 1,
    });

    res.json({ success: true, messages: history });
  } catch (err) {
    console.error("Error fetching chat history", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
export const markMessagesSeen = async (req: Request, res: Response) => {
  try {
    const { roomId, userId } = req.body;

    if (!roomId || !userId) {
      return res
        .status(400)
        .json({ success: false, error: "roomId and userId are required" });
    }

    // Mark all messages in this room not sent by this user as seen
    await ChatModel.updateMany(
      { roomId, user: { $ne: userId }, seen: false },
      { $set: { seen: true } }
    );

    // Optionally mark notifications as seen
    await Notification.updateMany(
      { receiver: userId, seen: false },
      { $set: { seen: true } }
    );

    res.json({ success: true, message: "Messages marked as seen" });
  } catch (err) {
    console.error("Error marking messages as seen:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
export const deleteChatMessage = async (req: Request, res: Response) => {
  try {
    const { messageId, userId, role } = req.body;

    if (!messageId || !userId || !role) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const message = await ChatModel.findById(messageId);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, error: "Message not found" });
    }

    // Admins can hard delete
    if (role === "Admin") {
      await message.deleteOne();
      return res.json({
        success: true,
        message: "Message hard-deleted (admin)",
      });
    }

    // Users can only delete their own messages (soft delete)
    if (message.user.toString() !== userId) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    message.deleted = true;
    await message.save();

    res.json({ success: true, message: "Message soft-deleted (user)" });
  } catch (err) {
    console.error("Delete message failed", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
export const getChatRoomsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const rooms = await ChatRoomModel.find({
      participants: userId,
    })
      .populate("participants", "name profileImage") // Optional
      .populate("lastMessage") // You can store/update lastMessage on send
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, rooms });
  } catch (err) {
    console.error("Error getting user rooms", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
export const startOrGetChatRoom = async (req: Request, res: Response) => {
  const { user1Id, user2Id } = req.body;

  if (!user1Id || !user2Id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing user IDs" });
  }

  try {
    let room = await ChatRoomModel.findOne({
      participants: { $all: [user1Id, user2Id], $size: 2 },
      isGroupChat: false,
    });

    if (!room) {
      room = await ChatRoomModel.create({
        participants: [user1Id, user2Id],
        roomId: new Types.ObjectId().toString(),
      });
    }

    res.status(200).json({ success: true, room });
  } catch (err) {
    console.error("Failed to get/create chat room:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
