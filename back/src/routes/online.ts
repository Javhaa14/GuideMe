// back/src/routes/online.ts
import express, { Request, Response } from "express";
import { UserModel } from "../model/User";
export const Onlinerouter = express.Router();

Onlinerouter.post(
  "/online",
  async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    try {
      await UserModel.findByIdAndUpdate(userId, {
        isOnline: true,
        lastSeen: new Date(),
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("❌ Error updating user status:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);
Onlinerouter.get("/online", async (req: Request, res: Response) => {
  try {
    const cutoff = new Date(Date.now() - 2 * 60 * 1000); // 2 minutes ago
    const onlineUsers = await UserModel.find({
      isOnline: true,
      lastSeen: { $gte: cutoff },
    }).select("username email isOnline lastSeen role"); // select fields you want to return

    res.status(200).json({ onlineUsers });
  } catch (error) {
    console.error("❌ Error fetching online users:", error);
    res.status(500).json({ error: "Server error" });
  }
});
