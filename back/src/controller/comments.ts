import { Request, Response } from "express";
import { Commentmodel } from "../model/Comment";
import { Guidemodel } from "../model/Guide";

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, rating, review, recommend, reviewerId } = req.body;
  console.log("Received body:", req.body);

  try {
    const comment = await Commentmodel.create({
      reviewerId,
      userId,
      rating,
      review,
      recommend,
    });
    const allRatings = await Commentmodel.find({ userId });
    const validRatings = allRatings
      .map((c) => c.rating ?? 0)
      .filter((r) => typeof r === "number");
    const totalRating = validRatings.reduce((sum, r) => sum + r, 0);
    const averageRating =
      validRatings.length > 0 ? totalRating / validRatings.length : 0;

    const updatedGuide = await Guidemodel.findByIdAndUpdate(
      userId,
      {
        $push: { reviewedBy: comment._id },
        $set: { rating: parseFloat(averageRating.toFixed(1)) },
      },
      { new: true }
    );

    console.log("✅ Guide updated with new comment and rating:", updatedGuide);

    res.status(200).send({
      success: true,
      comment,
      updatedGuide,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Unknown error occurred",
      });
    }
  }
};

export const getCommentsByuserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const comments = await Commentmodel.find({ userId }).populate({
      path: "reviewerId",
      select: "username _id role",
    });

    // Always respond with success and comments array, even if empty
    res.status(200).send({ success: true, comments });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ERROR in getCommentsByuserId:", {
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

