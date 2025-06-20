import { Router } from "express";
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} from "../controller/wish";

export const wishlistRouter = Router();

wishlistRouter.post("/", addToWishlist as any);
wishlistRouter.get("/:userId", getUserWishlist as any);
wishlistRouter.delete("/", removeFromWishlist as any);
