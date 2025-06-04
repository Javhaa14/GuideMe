import { Request, Response } from "express";
import { Postmodel } from "../model/Post";
import { Touristmodel } from "../model/Tourist";
import mongoose from "mongoose";

export const createPost = async (req: Request, res: Response) => {
  const { country, city, images, people, startDate, endDate, content, userId } =
    req.body;
  try {
    const post = await Postmodel.create({
      country,
      city,
      content,
      images,
      people,
      startDate,
      endDate,
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
    const posts = await Postmodel.aggregate([
      {
        $lookup: {
          from: "tourists",
          localField: "userId",
          foreignField: "_id",
          as: "tprofileInfo",
        },
      },
      {
        $unwind: {
          path: "$tprofileInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "tprofileInfo._id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: {
          path: "$userInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          userId: 1,
          content: 1,
          country: 1,
          city: 1,
          images: 1,
          people: 1,
          likes: 1,
          likedBy: 1,
          startDate: 1,
          endDate: 1,
          createdAt: 1,

          "tprofileInfo.gender": 1,
          "tprofileInfo.languages": 1,
          "tprofileInfo.location": 1,
          "tprofileInfo.profileimage": 1,
          "tprofileInfo.backgroundimage": 1,
          "tprofileInfo.socialAddress": 1,
          "tprofileInfo.about": 1,

          "userInfo.username": 1,
          "userInfo.email": 1,
          "userInfo.role": 1,
        },
      },
    ]);

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
    const posts = await Postmodel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "tourists",
          localField: "userId",
          foreignField: "_id",
          as: "tprofileInfo",
        },
      },
      {
        $unwind: {
          path: "$tprofileInfo",
          preserveNullAndEmptyArrays: true, // just in case some posts have missing tourist
        },
      },
      {
        $lookup: {
          from: "users", // Make sure this matches your actual User collection name
          localField: "tprofileInfo._id", // _id of Tourist is the User ID
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: {
          path: "$userInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          userId: 1,
          content: 1,
          country: 1,
          city: 1,
          images: 1,
          people: 1,
          likes: 1,
          likedBy: 1,
          startDate: 1,
          endDate: 1,
          createdAt: 1,

          // Tourist fields
          "tprofileInfo.gender": 1,
          "tprofileInfo.languages": 1,
          "tprofileInfo.location": 1,
          "tprofileInfo.profileimage": 1,
          "tprofileInfo.backgroundimage": 1,
          "tprofileInfo.socialAddress": 1,
          "tprofileInfo.about": 1,

          // User fields
          "userInfo.username": 1,
          "userInfo.email": 1,
          "userInfo.role": 1,
        },
      },
    ]);

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR:", error.message);
      res.status(500).json({
        error: "Server error",
        message:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
