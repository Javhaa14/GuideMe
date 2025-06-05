import { Commentmodel } from "../model/Comment";
import { Request, Response } from "express";

export const createComment = async (req: Request, res: Response) => {
  const { userId, rating, review, recommend, reviewerId } = req.body;
  try {
    const comment = await Commentmodel.create({
      reviewerId,
      userId,
      rating,
      review,
      recommend,
    });
    res.status(200).send({
      success: true,
      comment,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
export const getCommentsByuserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const comments = await Commentmodel.find({ userId });

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .send({ message: "No comments found for this user" });
    }

    return res.status(200).send({ success: true, comments });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getCommentsByuserId:", {
        message: error.message,
        stack: error.stack,
      });

      return res.status(500).send({
        error: "Internal Server Error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    } else {
      return res.status(500).send({ error: "Unexpected error occurred" });
    }
  }
};
