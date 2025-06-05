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
    comments,
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
      comments,
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
