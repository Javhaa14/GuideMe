import { Request, Response } from "express";
import { Postmodel } from "../model/Post";
<<<<<<< HEAD
import { Touristmodel } from "../model/Tourist";
import mongoose from "mongoose";
import { error } from "console";
=======
import mongoose from "mongoose";
import { UserModel } from "../model/User";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

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
<<<<<<< HEAD
=======
          activities: 1,
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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

<<<<<<< HEAD
    // Always return posts, even if empty array
=======
    // Always  posts, even if empty array
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
=======
          activities: 1,
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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

<<<<<<< HEAD
    // Return empty array if no posts found (instead of 404)
=======
    //  empty array if no posts found (instead of 404)
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
): Promise<void> => {
=======
): Promise<any> => {
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  const { postId, userId } = req.body;

  try {
    const post = await Postmodel.findById(postId);

    if (!post) {
<<<<<<< HEAD
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
=======
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likedBy.some(
      (like) => like.userId?.toString() === userId
    );

    if (alreadyLiked) {
      const toRemove = post.likedBy.find(
        (like) => like.userId?.toString() === userId
      );
      if (toRemove) post.likedBy.pull(toRemove);
    } else {
      post.likedBy.push({
        userId: new mongoose.Types.ObjectId(userId),
        likedAt: new Date(),
      });
    }

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      likedBy: post.likedBy,
      likesCount: post.likedBy.length,
    });
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
=======
export const getLikedUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { currentUserId } = req.params;

  try {
    // Get all posts by user, selecting only likedBy array
    const posts = await Postmodel.find({ userId: currentUserId }).select(
      "likedBy"
    );

    if (!posts.length) {
      res.status(200).send({ success: false, message: "No posts found" });
    }

    // Flatten all likedBy arrays (each likedBy item: { userId: ObjectId, likedAt: Date })
    let likedUsersData: { userId: mongoose.Types.ObjectId; likedAt: Date }[] =
      [];
    [];
    posts.forEach((post) => {
      const validLikes = post.likedBy
        .filter((like) => like.userId != null) // filter out undefined/null userId
        .map((like) => ({
          userId: like.userId as mongoose.Types.ObjectId,
          likedAt: like.likedAt,
        }));

      likedUsersData = likedUsersData.concat(validLikes);
    });
    // Sort by likedAt descending (most recent first)
    likedUsersData.sort((a, b) => b.likedAt.getTime() - a.likedAt.getTime());

    // Filter to unique userIds, keeping first occurrence (latest liked)
    const seen = new Set<string>();
    const uniqueLikedUsers = likedUsersData.filter(({ userId }) => {
      const idStr = userId.toString();
      if (seen.has(idStr)) return false;
      seen.add(idStr);
      return true;
    });

    // Extract userIds to query user details
    const userIds = uniqueLikedUsers.map((item) => item.userId);

    // Fetch user details
    const likedUsers = await UserModel.find({ _id: { $in: userIds } }).select(
      "username email role isOnline"
    );

    // Map user details back into the order of uniqueLikedUsers
    const likedUsersOrdered = uniqueLikedUsers
      .map(({ userId }) => likedUsers.find((user) => user._id.equals(userId)))
      .filter(Boolean); // filter out any null/undefined just in case

    res.status(200).send({ likedUsers: likedUsersOrdered, success: true });
  } catch (err: any) {
    res.status(500).send({ error: err.message || err, success: false });
  }
};
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
