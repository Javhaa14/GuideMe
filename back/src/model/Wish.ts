import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TripPlan",
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

wishlistItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });

export const WishlistModel = mongoose.model("Wishlist", wishlistItemSchema);
