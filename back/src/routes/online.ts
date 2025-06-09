import express, { Request, Response } from "express";
import { UserModel } from "../model/User";
import mongoose from "mongoose";

export const Onlinerouter = express.Router();

// Helper: build filter based on userId
function buildUserFilter(userId: string) {
  // If userId looks like a valid Mongo ObjectId, filter by _id
  if (mongoose.Types.ObjectId.isValid(userId)) {
    return { _id: userId };
  }
  // Otherwise, filter by provider_id (for OAuth users)
  return { provider_id: userId };
}

// Mark user as online & update lastSeen
Onlinerouter.post(
  "/online",
  async (req: Request, res: Response): Promise<any> => {
    console.log("Received POST /api/online", req.body);

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }

    try {
      const filter = buildUserFilter(userId);

      const user = await UserModel.findOneAndUpdate(
        filter,
        { isOnline: true, lastSeen: new Date() },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "User marked online", user });
    } catch (error) {
      console.error("❌ Error updating user online status:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

// Get all users online in last 1 min
Onlinerouter.get("/online", async (_req: Request, res: Response) => {
  try {
    const cutoff = new Date(Date.now() - 60 * 1000); // 1 minute ago
    const onlineUsers = await UserModel.find({
      lastSeen: { $gte: cutoff },
      isOnline: true,
    }).select("_id username email lastSeen role");

    res.status(200).json({ onlineUsers });
  } catch (error) {
    console.error("❌ Error fetching online users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update user online/offline status (for logout)
Onlinerouter.put(
  "/online",
  async (req: Request, res: Response): Promise<any> => {
    const { userId, isOnline } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }

    if (typeof isOnline !== "boolean") {
      return res
        .status(400)
        .json({ error: "Missing or invalid isOnline flag" });
    }

    try {
      const filter = buildUserFilter(userId);

      const user = await UserModel.findOneAndUpdate(
        filter,
        { isOnline, lastSeen: new Date() },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({
        success: true,
        message: `User marked ${isOnline ? "online" : "offline"}`,
      });
    } catch (error) {
      console.error("❌ Error updating user online status:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);
