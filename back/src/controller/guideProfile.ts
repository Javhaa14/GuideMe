import { Request, Response } from "express";
import { Guidemodel } from "../model/Guide";
import mongoose from "mongoose";

export const createGuideProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    _id,
    firstName,
    lastName,
    username,
    price,
    experience,
    car,
    activities,
    socialAddress,
    about,
    profileimage,
    location,
    gender,
    languages,
    status,
    rating,
  } = req.body;

  try {
    const userId = new mongoose.Types.ObjectId(_id);

    const Gprofile = await Guidemodel.create({
      _id: userId,
      username,
      languages,
      socialAddress,
      firstName,
      lastName,
      price,
      experience,
      car,
      activities,
      about,
      profileimage,
      location,
      gender,
      status,
      rating,
    });

    res.status(200).send({
      success: true,
      Gprofile,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error creating guide profile:", error.message);

      res.status(400).send({
        success: false,
        message: error.message,
      });
    } else {
      console.error("❌ Unknown error creating guide profile");

      res.status(400).send({
        success: false,
        message: "Unknown error occurred",
      });
    }
  }
};

export const getGuideByuserId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { _id } = req.params;

  try {
    const guide = await Guidemodel.findOne({ _id }).populate({
      path: "_id",
      select: "username email role",
    });

    if (!guide) {
      return res.status(200).send(null);
    }

    res.status(200).send(guide);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getGuideByuserId:", {
        message: error.message,
        stack: error.stack,
      });

      res.status(500).send({
        error: "Internal Server Error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    } else {
      res.status(500).send({ error: "Unexpected error occurred" });
    }
  }
};

export const getGuides = async (_: Request, res: Response): Promise<void> => {
  try {
    const guides = await Guidemodel.find().lean();

    if (!guides.length) {
      console.warn("No guides found");
    }

    res.status(200).send(guides);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getGuides:", {
        message: error.message,
        stack: error.stack,
      });

      res.status(500).send({
        error: "Internal Server Error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    } else {
      res.status(500).send({ error: "Unexpected error occurred" });
    }
  }
};

export const updateGuideProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, guideId } = req.body;

  // Validate both IDs first
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(guideId)
  ) {
    return res.status(400).json({ message: "Invalid userId or guideId" });
  }

  try {
    const guideProfile = await Guidemodel.findById(guideId);
    if (!guideProfile) {
      return res.status(404).json({ message: "Guide profile not found" });
    }

    const alreadyLiked = guideProfile.likedBy.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      guideProfile.likedBy = guideProfile.likedBy.filter(
        (id) => id.toString() !== userId
      );
    } else {
      guideProfile.likedBy.push(new mongoose.Types.ObjectId(userId));
    }

    await guideProfile.save();
    res.status(200).json({
      message: "Post updated successfully",
      likedBy: guideProfile.likedBy,
    });
  } catch (error) {
    res.status(400).send({
      error,
      success: false,
    });
  }
};
export const saveAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, availability } = req.body;

  if (!userId || !Array.isArray(availability)) {
    res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const updated = await Guidemodel.findOneAndUpdate(
      { _id: userId },
      { availability: availability },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, availability: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!userId || typeof userId !== "string") {
    res.status(400).json({ message: "userId is required" });
    return;
  }

  try {
    const doc = await Guidemodel.findById(userId);
    res.status(200).send({ success: true, availability: doc?.availability });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
