import express from "express";
import { createPost } from "../controller/post";

export const postRouter = express.Router();

postRouter.post("/", createPost);
