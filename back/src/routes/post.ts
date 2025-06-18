import express from "express";
import {
  createPost,
  getLikedUsers,
  getPostById,
  getPosts,
  getPostsByUserId,
  updatePost,
} from "../controller/post";

export const postRouter = express.Router();

postRouter
  .post("/", createPost)
  .get("/", getPosts)
  .get("/:userId", getPostsByUserId)
  .put("/", updatePost)
  .get("/postid/:id", getPostById)
  .get("/liked/:currentUserId", getLikedUsers);
