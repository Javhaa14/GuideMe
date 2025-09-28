import { NextFunction, Request, Response } from "express";
import { UserModel } from "../model/User";
import { MessageModel } from "../model/Message";
import { ChatRoomModel } from "../model/ChatRoom";
import { Guidemodel } from "../model/Guide";
import { Touristmodel } from "../model/Tourist";
import { NotificationModel } from "../model/NotifModel";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { senderId, receiverId, content } = req.body;

    const sender = await UserModel.findById(senderId);
    const receiver = await UserModel.findById(receiverId);

    if (!sender || !receiver) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const sortedParticipants = [senderId, receiverId].sort();

    // Try to find existing chat room with simple query
    let chatRoom = await ChatRoomModel.findOne({
      participants: sortedParticipants,
    });

    // If no chat room exists, create one
    if (!chatRoom) {
      try {
        chatRoom = await ChatRoomModel.create({
          participants: sortedParticipants,
          lastMessage: null,
        });
      } catch (createError: any) {
        // Handle race condition - another request might have created the room
        if (createError.code === 11000) {
          chatRoom = await ChatRoomModel.findOne({
            participants: sortedParticipants,
          });
          if (!chatRoom) {
            res
              .status(500)
              .json({ message: "Failed to create or find chat room" });
            return;
          }
        } else {
          throw createError;
        }
      }
    }

    const message = await MessageModel.create({
      roomId: chatRoom._id,
      sender: senderId,
      receiver: receiverId,
      content,
    });

    chatRoom.lastMessage = message._id;
    chatRoom.updatedAt = new Date();
    await chatRoom.save();

    const notification = await NotificationModel.create({
      user: receiverId,
      sender: senderId,
      type: "message",
      message: message._id,
      isSaw: false,
    });

    await UserModel.findByIdAndUpdate(receiverId, {
      $push: { notifications: notification._id },
    });

    // Populate the message with sender info and profile image
    const populatedMessage = await MessageModel.findById(message._id)
      .populate("sender", "username role")
      .populate("receiver", "username role");

    // Get profile image for the sender
    const senderProfileImage = await getProfileImage(senderId, sender.role);

    // Create the response with profile image
    const messageWithProfile = {
      ...populatedMessage.toObject(),
      sender: {
        ...populatedMessage.sender.toObject(),
        profileimage: senderProfileImage,
      },
      receiver: {
        ...populatedMessage.receiver.toObject(),
        profileimage: await getProfileImage(receiverId, receiver.role),
      },
    };

    res.status(201).json({ message: "Message sent", data: messageWithProfile });
  } catch (error) {
    next(error);
  }
};

export const markMessageAsSeen = async (req: Request, res: Response) => {
  try {
    const { messageId, userId } = req.body;
    const message = await MessageModel.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });
    if (message.receiver.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (!message.isSeen) {
      message.isSeen = true;
      message.seenAt = new Date();
      await message.save();
      await NotificationModel.updateMany(
        { message: message._id, user: userId },
        { isSaw: true }
      );
    }

    res.json({ message: "Message marked as seen" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Simple function to get or create chat room for frontend
export const getChatRoom = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;

    if (!participants || participants.length !== 2) {
      return res
        .status(400)
        .json({ message: "Exactly 2 participants required" });
    }

    const sortedParticipants = participants.sort();

    // Just find existing room, don't create
    const chatRoom = await ChatRoomModel.findOne({
      participants: sortedParticipants,
    });

    if (chatRoom) {
      res.json({ room: chatRoom });
    } else {
      res.json({ room: null }); // Let frontend know no room exists yet
    }
  } catch (error) {
    console.error("Error in getChatRoom:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfileImage = async (userId: string, role: string) => {
  if (role === "Guide") {
    const guide = await Guidemodel.findById(userId, "profileimage");
    return guide?.profileimage || null;
  }
  if (role === "Tourist") {
    const tourist = await Touristmodel.findById(userId, "profileimage");
    return tourist?.profileimage || null;
  }
  return null;
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const chatRoom = await ChatRoomModel.findById(roomId);
    if (!chatRoom)
      return res.status(404).json({ message: "Chat room not found" });

    const messages = await MessageModel.find({ roomId })
      .sort({ createdAt: 1 }) // Use createdAt instead of created_at
      .populate("sender", "username role")
      .populate("receiver", "username role");

    // Collect unique users involved in messages
    const userIds = new Set<string>();
    messages.forEach((msg) => {
      userIds.add(msg.sender._id.toString());
      userIds.add(msg.receiver._id.toString());
    });

    // Get user roles
    const users = await UserModel.find(
      { _id: { $in: Array.from(userIds) } },
      "role"
    );

    // Fetch profile images for all users
    const profiles = await Promise.all(
      users.map(async (user) => ({
        id: user._id.toString(),
        profileimage: await getProfileImage(user._id.toString(), user.role),
      }))
    );

    // Create a map for quick lookup
    const profilesMap = Object.fromEntries(
      profiles.map((p) => [p.id, p.profileimage])
    );

    // Attach profile image to sender and receiver in messages
    const messagesWithProfiles = messages.map((msg) => ({
      ...msg.toObject(),
      sender: {
        ...msg.sender.toObject(),
        profileimage: profilesMap[msg.sender._id.toString()] || null,
      },
      receiver: {
        ...msg.receiver.toObject(),
        profileimage: profilesMap[msg.receiver._id.toString()] || null,
      },
    }));

    res.json({ messages: messagesWithProfiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserChatRooms = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const rooms = await ChatRoomModel.find({ participants: userId })
      .sort({ updatedAt: -1 })
      .populate("lastMessage")
      .populate("participants", "username role");

    // Collect unique participant IDs
    const participantIds = new Set<string>();
    rooms.forEach((room) => {
      room.participants.forEach((p: any) =>
        participantIds.add(p._id.toString())
      );
    });

    // Get user roles
    const users = await UserModel.find(
      { _id: { $in: Array.from(participantIds) } },
      "role"
    );

    // Fetch profile images for all participants
    const profiles = await Promise.all(
      users.map(async (user) => ({
        id: user._id.toString(),
        profileimage: await getProfileImage(user._id.toString(), user.role),
      }))
    );

    const profilesMap = Object.fromEntries(
      profiles.map((p) => [p.id, p.profileimage])
    );

    // Attach profile images to participants in each room
    const roomsWithProfiles = rooms.map((room) => ({
      ...room.toObject(),
      participants: room.participants.map((p: any) => ({
        ...p.toObject(),
        profileimage: profilesMap[p._id.toString()] || null,
      })),
    }));

    res.json({ rooms: roomsWithProfiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
