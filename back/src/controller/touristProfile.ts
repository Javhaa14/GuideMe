import { Request, Response } from "express";
import { Touristmodel } from "../model/Tourist";

export const createTouristProfile = async (req: Request, res: Response) => {
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
  try {
    const Tprofile = await Touristmodel.create({
      _id,
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
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
export const getTourists = async (_: Request, res: Response) => {
  try {
    const tourists = await Touristmodel.find().lean();

    if (!tourists.length) {
      console.warn("No tourists");
    }

    res.status(200).send(tourists);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in gettourists:", {
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
export const getTouristByuserId = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const tourist = await Touristmodel.findOne({ _id }).populate({
      path: "_id",
      select: "username email role",
    });

    if (!tourist) {
      res.status(404).send({ message: "Tourist profile not found" });
    }

    res.status(200).send(tourist);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in gettourists:", {
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
