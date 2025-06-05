import { Request, Response } from "express";
import { Guidemodel } from "../model/Guide";

export const createGuideProfile = async (req: Request, res: Response) => {
  const {
    _id,
    languages,
    firstName,
    lastName,
    price,
    status,
    rating,
    experience,
    car,
    activities,
    profileimage,
    backgroundimage,
    socialAddress,
  } = req.body;
  try {
    const Tprofile = await Guidemodel.create({
      _id,
      languages,
      location,
      profileimage,
      backgroundimage,
      socialAddress,
      firstName,
      lastName,
      price,
      status,
      rating,
      experience,
      car,
      activities,
    });
    res.status(200).send({
      success: true,
      Tprofile,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
export const getGuideByuserId = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const guide = await Guidemodel.findOne({ _id }).populate({
      path: "_id",
      select: "username email role",
    });

    if (!guide) {
      res.status(404).send({ message: "guide profile not found" });
    }

    res.status(200).send(guide);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getguides:", {
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
export const getGuides = async (_: Request, res: Response) => {
  try {
    const guides = await Guidemodel.find().lean();

    if (!guides.length) {
      console.warn("No guides");
    }

    res.status(200).send(guides);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getguides:", {
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
