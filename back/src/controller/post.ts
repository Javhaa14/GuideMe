import { Request, Response } from "express";
import { Postmodel } from "../model/Post";
import { Touristmodel } from "../model/Tourist";
import mongoose from "mongoose";
import { error } from "console";

type UpdatePostBody = {
  postId: string;
  userId: string;
};
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    activities,
    country,
    city,
    images,
    people,
    startDate,
    endDate,
    content,
    userId,
  } = req.body;
  try {
    const post = await Postmodel.create({
      activities,
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).send({
      success: false,
      message,
    });
  }
};

export const getPosts = async (_: Request, res: Response): Promise<void> => {
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
          activites: 1,
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

    // Always return posts, even if empty array
    res.status(200).json(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getPosts:", {
        message: error.message,
        stack: error.stack,
      });

      res.status(500).json({
        error: "Internal Server Error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
};

export const getPostsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
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
          activities: 1,
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

    // Return empty array if no posts found (instead of 404)
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

export const updatePost = async (
  req: Request<{}, {}, UpdatePostBody>,
  res: Response
): Promise<void> => {
  const { postId, userId } = req.body;

  try {
    const post = await Postmodel.findById(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      const alreadyLiked = post.likedBy.some((id) => id.toString() === userId);

      if (alreadyLiked) {
        post.likedBy = post.likedBy.filter((id) => id.toString() !== userId);
      } else {
        post.likedBy.push(new mongoose.Types.ObjectId(userId));
      }

      await post.save();
      res.status(200).json({
        message: "Post updated successfully",
        likedBy: post.likedBy,
        likesCount: post.likedBy.length,
      });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const post = await Postmodel.findById(id);
    if (post)
      res.status(222).send({
        post: post,
        success: true,
      });
    else
      res.status(100).send({
        success: "hudlaa baina alga baina",
      });
  } catch (err) {
    res.status(400).send({
      error: err,
      success: false,
    });
  }
};
