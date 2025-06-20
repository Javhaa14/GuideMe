import express from "express";
import {
  createPost,
<<<<<<< HEAD
=======
  getLikedUsers,
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
  .get("/postid/:id", getPostById);
=======
  .get("/postid/:id", getPostById)
  .get("/liked/:currentUserId", getLikedUsers);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
