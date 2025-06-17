import { Request, Response } from "express";
import { UserModel } from "../model/User";
import { Notification } from "../model/notification";

export const sendNotification = async (req: Request, res: Response) => {
  const { senderId, receiverId, messageId } = req.body;

  try {
    const notification = await Notification.create({
      sender: senderId,
      receiver: receiverId,
      message: messageId,
    });

    await UserModel.findByIdAndUpdate(receiverId, {
      $push: { notifications: notification._id },
    });

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
export const getNotificationsById = async (req: Request, res: Response) => {
  const { receiverId } = req.body;

  try {
    const notifications = await Notification.find({ receiver: receiverId });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
export const markAsSeen = async (req: Request, res: Response) => {
  const { notificationId } = req.params;

  try {
    const updated = await Notification.findByIdAndUpdate(
      notificationId,
      { seen: true },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
