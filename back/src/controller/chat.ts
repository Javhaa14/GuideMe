// routes/chat.ts or controller
import { Request, Response } from "express";
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
        // Fetch user to get username and role
        const userInfo = await UserModel.findById(partnerId).select(
          "username profileimage role"
        );

        let profileimage = userInfo?.profileimage || null;

        // Depending on role, fetch profile image from the right profile collection
        if (userInfo?.role === "tourist") {
          const touristProfile = await Touristmodel.findOne({
            _id: partnerId,
          }).select("profileimage");
          if (touristProfile?.profileimage)
            profileimage = touristProfile.profileimage;
        } else if (userInfo?.role === "guide") {
          const guideProfile = await Guidemodel.findOne({
            _id: partnerId,
          }).select("profileimage");
          if (guideProfile?.profileimage)
            profileimage = guideProfile.profileimage;
        }

        // Count unread messages
        const unreadCount = await ChatMessageModel.countDocuments({
          roomId: msg.roomId,
          userId: { $ne: userId }, // Sent by the partner
          readBy: { $ne: userId }, // Not read yet
        });

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

          unreadCount,
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

// controller/chat.ts
export const markMessagesAsRead = async (req: Request, res: Response) => {
  try {
    const { roomId, userId } = req.body;

    await ChatMessageModel.updateMany(
      {
        roomId,
        userId: { $ne: userId }, // not sent by this user
        readBy: { $ne: userId }, // and not already read
      },
      { $addToSet: { readBy: userId } } // add userId if not already there
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to mark messages as read", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
