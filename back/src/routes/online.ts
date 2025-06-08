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
        lastSeen: new Date(),
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("❌ Error updating user status:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

Onlinerouter.get("/online", async (_req: Request, res: Response) => {
  try {
    const cutoff = new Date(Date.now() - 60 * 1000); // last 1 min
    const onlineUsers = await UserModel.find({
      lastSeen: { $gte: cutoff },
    }).select("_id username email lastSeen role");

    res.status(200).json({ onlineUsers });
  } catch (error) {
    console.error("❌ Error fetching online users:", error);
    res.status(500).json({ error: "Server error" });
  }
});
