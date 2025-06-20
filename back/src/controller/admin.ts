import { Request, Response } from "express";
import { UserModel } from "../model/User";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, status, search } = req.query;

    const query: any = {};
    if (role) query.role = role;
    if (status && status !== "all") query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }
    const users = await UserModel.find(query).sort({ createdAt: -1 });
    res.status(200).send({ success: true }).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getActiveUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const activeUsers = await UserModel.find({
      isOnline: { $ne: "offline" },
      status: "active",
    })
      .sort({ lastActive: -1 })
      .limit(4);

    res.status(200).send({ success: true, users: activeUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
