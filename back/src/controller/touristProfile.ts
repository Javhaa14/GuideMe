import { Request, Response } from "express";
import { Touristmodel } from "../model/Tourist";
import mongoose from "mongoose";

export const createTouristProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Incoming Tourist Profile POST body:", req.body);

  try {
    const {
      _id,
      languages,
      location,
      profileimage,
      backgroundimage,
      socialAddress,
      about,
      gender,
    } = req.body;

    const userId =
      typeof _id === "string" ? new mongoose.Types.ObjectId(_id) : _id;

    // Optional: check if tourist profile already exists
    const existingProfile = await Touristmodel.findById(userId);
    if (existingProfile) {
      res
        .status(409)
        .json({ success: false, message: "Profile already exists" });
    }

    const Tprofile = await Touristmodel.create({
      _id: userId,
      languages,
      location,
      profileimage,
      backgroundimage,
      socialAddress,
      about,
      gender,
    });

    res.status(200).send({
      success: true,
      Tprofile,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).send({
      success: false,
      message,
    });
  }
};

export const getTourists = async (_: Request, res: Response): Promise<void> => {
  try {
    const tourists = await Touristmodel.find().lean();

    if (!tourists.length) {
      console.warn("No tourists");
    }

    res.status(200).send(tourists);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getTourists:", {
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

export const getTouristByuserId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid tourist ID" });
  }

  try {
    const tourist = await Touristmodel.findOne({ _id }).populate({
      path: "_id",
      select: "username email role",
    });

    if (!tourist) {
      return res.status(200).send(null);
    }

    res.status(200).send(tourist);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

export const updateTouristProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid tourist ID" });
  }

  const {
    languages,
    location,
    profileimage,
    backgroundimage,
    socialAddress,
    about,
    gender,
  } = req.body;

  try {
    const updatedProfile = await Touristmodel.findByIdAndUpdate(
      _id,
      {
        ...(languages && { languages }),
        ...(location && { location }),
        ...(profileimage && { profileimage }),
        ...(backgroundimage && { backgroundimage }),
        ...(socialAddress && { socialAddress }),
        ...(about && { about }),
        ...(gender && { gender }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProfile) {
      res.status(404).send({
        success: false,
        message: "Tourist profile not found",
      });
      return;
    }

    res.status(200).send({
      success: true,
      updatedProfile,
    });
  } catch (error: unknown) {
    // ...
  }
};
