import express from "express";
import { createPost, getPosts, getPostsByUserId } from "../controller/post";

export const postRouter = express.Router();

postRouter
  .post("/", createPost)
  .get("/", getPosts)
  .get("/:userId", getPostsByUserId);
