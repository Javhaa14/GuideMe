// back/src/routes/online.ts
import express, { Request, Response } from "express";
import { UserModel } from "../model/User";
const router = express.Router();

router.post("/online", async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;

  if (!userId) res.status(400).json({ error: "Missing userId" });

  try {
    await UserModel.findByIdAndUpdate(userId, {
      isOnline: true,
      lastSeen: new Date(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error updating user status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
