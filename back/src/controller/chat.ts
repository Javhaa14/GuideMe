// routes/chat.ts or controller
import { Request, Response } from "express";
import { Notification } from "../model/notification";
import { Types } from "mongoose";
import { ChatMessageModel } from "../model/ChatHistory";
import { UserModel } from "../model/User";
import { Touristmodel } from "../model/Tourist";
import { Guidemodel } from "../model/Guide";

export const saveChatMessage = async (req: Request, res: Response) => {
  try {
    const { user, text, profileimage, roomId } = req.body;
    const newMessage = await ChatMessageModel.create({
      user,
      text,
      profileimage,
      roomId,
    });
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
export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const allMessages = await ChatMessageModel.find({
      roomId: { $regex: userId },
    }).sort({ createdAt: -1 });

    const conversationsMap = new Map();

    for (const msg of allMessages) {
      const [id1, id2] = msg.roomId.split("-");
      const partnerId = id1 === userId ? id2 : id1;

      if (!conversationsMap.has(partnerId)) {
        const userInfo = await UserModel.findById(partnerId).select(
          "username profileimage role"
        );

        let profileimage = userInfo?.profileimage || null;

        // Check role and fetch profile image
        if (userInfo?.role === "tourist") {
          const touristProfile = await Touristmodel.findById(partnerId).select(
            "profileimage"
          );
          if (touristProfile?.profileimage)
            profileimage = touristProfile.profileimage;
        } else if (userInfo?.role === "guide") {
          const guideProfile = await Guidemodel.findById(partnerId).select(
            "profileimage"
          );
          if (guideProfile?.profileimage)
            profileimage = guideProfile.profileimage;
        }

        conversationsMap.set(partnerId, {
          roomId: msg.roomId,
          user: {
            id: partnerId,
            name: userInfo?.username || "Unknown",
            profileimage,
          },
          lastMessage: {
            text: msg.text,
            createdAt: msg.createdAt,
            userId: msg.user,
          },
        });
      }
    }

    res.json({
      success: true,
      conversations: Array.from(conversationsMap.values()),
    });
  } catch (err) {
    console.error("Failed to fetch conversations", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
