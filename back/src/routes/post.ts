import express from "express";
import { createPost, getPosts, getPostsByTouristId } from "../controller/post";

export const postRouter = express.Router();

postRouter
  .post("/", createPost)
  .get("/", getPosts)
  .get("/:touristId", getPostsByTouristId);
