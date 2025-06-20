import { Request, Response } from "express";
import { UserModel } from "../model/User";
import { Notification } from "../model/notification";

export const sendNotification = async (req: Request, res: Response) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const notification = await Notification.create({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    const user = await UserModel.findById(receiverId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const senderGroup = user.notifications.find(
      (group: any) => group.sender.toString() === senderId
    );

    if (senderGroup) {
      // Avoid duplicates
      if (!senderGroup.notifications.includes(notification._id)) {
        senderGroup.notifications.push(notification._id);
      }
    } else {
      // Add new sender group
      user.notifications.push({
        sender: senderId,
        notifications: [notification._id],
      });
    }

    await user.save();

    res.status(200).json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getNotificationsById = async (req: Request, res: Response) => {
  const { currentUser } = req.params;
  try {
    const Allnotifications = await Notification.find({
      receiver: currentUser,
      message: { $exists: true, $ne: "" },
    });

    res.status(200).json(Allnotifications);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getUnseenNotifications = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({
      receiver: userId,
      seen: false, // 👈 Only get unseen
    }).lean();

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
// routes/notification.ts
export const markAllFromSenderAsSeen = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;

  try {
    const result = await Notification.updateMany(
      { sender: senderId, receiver: receiverId, seen: false },
      { $set: { seen: true } }
    );
    res.status(200).json({ success: true, modified: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
