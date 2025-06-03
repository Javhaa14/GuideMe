import { Request, Response } from "express";
import { Postmodel } from "../model/Post";

export const createPost = async (req: Request, res: Response) => {
  const { country, city, images, people, startDate, endDate, content, userId } =
    req.body;
  try {
    const post = await Postmodel.create({
      country,
      city,
      images,
      people,
      startDate,
      endDate,
      content,
      userId,
    });

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
export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Postmodel.find().lean();

    if (!posts.length) {
      console.warn("4. WARNING: Empty post array returned");
    }

    res.status(200).send(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getPosts:", {
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
console.log("hi");

export const getPostsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const posts = await Postmodel.find({ userId }).populate({
      path: "userId",
      select: "gender languages location profileimage",
    });
    if (!posts.length) {
      console.warn("You didn't post anything");
    }

    res.status(200).send(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getPostsByTouristId:", {
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
