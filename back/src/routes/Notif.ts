import express from "express";
import { NotificationModel } from "../model/Notif";

export const NotificationRouter = express.Router();

NotificationRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const notifs = await NotificationModel.find({ toUserId: userId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ success: true, notifications: notifs });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
})
  .get("/unread-count/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const count = await NotificationModel.countDocuments({
        toUserId: userId,
        read: false,
      });

      res.json({ count });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch unread count" });
    }
  })
  .put("/mark-seen/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
      // toUserId нь тухайн хэрэглэгч бөгөөд уншаагүй мэдэгдлийг update хийж байна
      const result = await NotificationModel.updateMany(
        { toUserId: userId, read: false },
        { $set: { read: true } }
      );

      console.log(`🔵 Marked notifications as read for user ${userId}`);
      res
        .status(200)
        .json({ success: true, modifiedCount: result.modifiedCount });
    } catch (error) {
      console.error("❌ Failed to mark notifications as read:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });
