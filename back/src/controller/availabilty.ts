import { Request, Response } from "express";
import { AvailabilityModel } from "../model/Availability";

export const saveAvailability = async (req: Request, res: Response) => {
  const { userId, availability } = req.body;

  if (!userId || !Array.isArray(availability)) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const updated = await AvailabilityModel.findOneAndUpdate(
      { userId },
      { availability },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, availability: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAvailability = async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const doc = await AvailabilityModel.findOne({ userId });
    res
      .status(200)
      .json({ success: true, availability: doc?.availability || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
