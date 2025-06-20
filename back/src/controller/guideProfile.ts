<<<<<<< HEAD
import { Request, Response } from 'express';
import { Guidemodel } from '../model/Guide';
import mongoose from 'mongoose';
=======
import { Request, Response } from "express";
import { Guidemodel } from "../model/Guide";
import mongoose from "mongoose";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

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
<<<<<<< HEAD
=======
    slogan,
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
=======
      slogan,
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
      console.error('❌ Error creating guide profile:', error.message);
=======
      console.error("❌ Error creating guide profile:", error.message);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

      res.status(400).send({
        success: false,
        message: error.message,
      });
    } else {
<<<<<<< HEAD
      console.error('❌ Unknown error creating guide profile');

      res.status(400).send({
        success: false,
        message: 'Unknown error occurred',
=======
      console.error("❌ Unknown error creating guide profile");

      res.status(400).send({
        success: false,
        message: "Unknown error occurred",
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
      path: '_id',
      select: 'username email role',
=======
      path: "_id",
      select: "username email role",
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    });

    if (!guide) {
      return res.status(200).send(null);
    }

    res.status(200).send(guide);
  } catch (error: unknown) {
    if (error instanceof Error) {
<<<<<<< HEAD
      console.error('ERROR in getGuideByuserId:', {
=======
      console.error("ERROR in getGuideByuserId:", {
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        message: error.message,
        stack: error.stack,
      });

      res.status(500).send({
<<<<<<< HEAD
        error: 'Internal Server Error',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    } else {
      res.status(500).send({ error: 'Unexpected error occurred' });
=======
        error: "Internal Server Error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    } else {
      res.status(500).send({ error: "Unexpected error occurred" });
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    }
  }
};

<<<<<<< HEAD

=======
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
export const getGuides = async (_: Request, res: Response): Promise<void> => {
  try {
    const guides = await Guidemodel.find().lean();

    if (!guides.length) {
<<<<<<< HEAD
      console.warn('No guides found');
=======
      console.warn("No guides found");
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    }

    res.status(200).send(guides);
  } catch (error: unknown) {
    if (error instanceof Error) {
<<<<<<< HEAD
      console.error('ERROR in getGuides:', {
=======
      console.error("ERROR in getGuides:", {
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        message: error.message,
        stack: error.stack,
      });

      res.status(500).send({
<<<<<<< HEAD
        error: 'Internal Server Error',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    } else {
      res.status(500).send({ error: 'Unexpected error occurred' });
=======
        error: "Internal Server Error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    } else {
      res.status(500).send({ error: "Unexpected error occurred" });
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
    return res.status(400).json({ message: 'Invalid userId or guideId' });
=======
    return res.status(400).json({ message: "Invalid userId or guideId" });
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  }

  try {
    const guideProfile = await Guidemodel.findById(guideId);
    if (!guideProfile) {
<<<<<<< HEAD
      return res.status(404).json({ message: 'Guide profile not found' });
=======
      return res.status(404).json({ message: "Guide profile not found" });
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
      message: 'Post updated successfully',
=======
      message: "Post updated successfully",
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      likedBy: guideProfile.likedBy,
    });
  } catch (error) {
    res.status(400).send({
      error,
      success: false,
    });
  }
};
<<<<<<< HEAD
=======

import { Request, Response } from "express";
import mongoose from "mongoose";
import { Guidemodel } from "../models/GuideModel"; // өөрийн замаа шалгаарай

export const editGuideProfile = async (req: Request, res: Response) => {
  const { guideId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(guideId)) {
    return res.status(400).json({ message: "Invalid guideId" });
  }

  try {
    const updateData = req.body;

    if (updateData.languages && !Array.isArray(updateData.languages)) {
      return res.status(400).json({ message: "Languages must be an array" });
    }

    const updatedGuide = await Guidemodel.findByIdAndUpdate(
      guideId,
      updateData,
      { new: true }
    );

    if (!updatedGuide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    return res.status(200).json(updatedGuide);
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Failed to update guide", error });
  }
};


>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
export const saveAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, availability } = req.body;

  if (!userId || !Array.isArray(availability)) {
<<<<<<< HEAD
    res.status(400).json({ message: 'Invalid request body' });
=======
    res.status(400).json({ message: "Invalid request body" });
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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

<<<<<<< HEAD
  if (!userId || typeof userId !== 'string') {
    res.status(400).json({ message: 'userId is required' });
=======
  if (!userId || typeof userId !== "string") {
    res.status(400).json({ message: "userId is required" });
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    return;
  }

  try {
    const doc = await Guidemodel.findById(userId);
    res.status(200).send({ success: true, availability: doc?.availability });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
