import express from "express";
import { createComment, getCommentsByuserId } from "../controller/comments";

export const commentRouter = express.Router();

commentRouter
  .post("/", createComment)
  .get("/:userId", getCommentsByuserId as any);
