import { Request, Response } from "express";
import { Postmodel } from "../model/Post";

export const createPost = async (req: Request, res: Response) => {
  const {
    country,
    city,
    images,
    people,
    startDate,
    endDate,
    content,
    touristId,
  } = req.body;
  try {
    const post = await Postmodel.create({
      country,
      city,
      images,
      people,
      startDate,
      endDate,
      content,
      touristId,
    });
    console.log(post, "post");
    res.status(200).send({
      success: true,
      post,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
