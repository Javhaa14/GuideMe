import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ensure one wishlist per user
    },
    tripPlanIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TripPlan",
      },
    ],
  },
  { timestamps: true }
);

export const WishlistModel = mongoose.model("Wishlist", wishlistSchema);
