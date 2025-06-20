import { Request, Response } from "express";
import { WishlistModel } from "../model/Wish";
import mongoose from "mongoose";

export const addToWishlist = async (req: Request, res: Response) => {
  const { userId, tripPlanId } = req.body;
  if (!userId || !tripPlanId) {
    return res
      .status(400)
      .json({ message: "userId болон tripPlanId шаардлагатай" });
  }

  try {
    let wishlist = await WishlistModel.findOne({ userId });

    if (!wishlist) {
      // Create new wishlist document if none exists
      wishlist = new WishlistModel({ userId, tripPlanIds: [tripPlanId] });
      await wishlist.save();
      return res.status(201).json({ message: "Added to wishlist" });
    }

    // Check if tripPlanId already exists
    if (wishlist.tripPlanIds.includes(tripPlanId)) {
      return res.status(409).json({ message: "Already in wishlist" });
    }

    // Add tripPlanId to array
    wishlist.tripPlanIds.push(tripPlanId);
    await wishlist.save();

    res.status(201).json({ message: "Added to wishlist" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Wishlist add error:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    } else {
      console.error("Wishlist add error (unknown):", err);
      res.status(500).json({ message: "Server error", error: String(err) });
    }
  }
};

export const getUserWishlist = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    // Find the wishlist document for the user
    const wishlist = await WishlistModel.findOne({ userId }).populate(
      "tripPlanIds"
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Return the array of populated trip plans
    res.json(wishlist.tripPlanIds);
  } catch (err) {
    console.error("getUserWishlist error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { userId, tripPlanId } = req.body;
  if (!userId || !tripPlanId) {
    return res
      .status(400)
      .json({ message: "userId ба tripPlanId заавал байх ёстой" });
  }

  try {
    const wishlist = await WishlistModel.findOne({ userId });

    if (!wishlist) {
      return res
        .status(404)
        .json({ message: "Wishlist document not found for this user" });
    }

    // Remove tripPlanId from array
    const index = wishlist.tripPlanIds.indexOf(tripPlanId);
    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Wishlist дээр энэ item байхгүй байна" });
    }

    wishlist.tripPlanIds.splice(index, 1);
    await wishlist.save();

    res.json({ message: "Амжилттай устгалаа" });
  } catch (err) {
    res.status(500).json({ message: "Серверийн алдаа", error: err });
  }
};
