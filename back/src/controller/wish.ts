import { Request, Response } from "express";
import { WishlistModel } from "../model/Wish";

export const addToWishlist = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;
  console.log("Wishlist add request:", { userId, itemId });

  try {
    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ message: "userId болон itemId шаардлагатай" });
    }

    const existing = await WishlistModel.findOne({ userId, itemId });
    if (existing) {
      return res.status(409).json({ message: "Already in wishlist" });
    }

    const newItem = new WishlistModel({ userId, itemId });
    await newItem.save();
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
  try {
    const wishlist = await WishlistModel.find({ userId }).populate("itemId");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { userId, itemId } = req.body;

  if (!userId || !itemId) {
    return res
      .status(400)
      .json({ message: "userId ба itemId заавал байх ёстой" });
  }

  try {
    const removed = await WishlistModel.findOneAndDelete({ userId, itemId });

    if (!removed) {
      return res
        .status(404)
        .json({ message: "Wishlist дээр энэ item байхгүй байна" });
    }

    res.json({ message: "Амжилттай устгалаа" });
  } catch (err) {
    res.status(500).json({ message: "Серверийн алдаа", error: err });
  }
};
