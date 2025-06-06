import express from "express";

import { verifyToken } from "../middleware/auth";
import {
  createUser,
  deleteUserById,
  getCurrentUser,
  getUserById,
  getUsers,
  updateUserById,
} from "../controller/User";

export const userRouter = express.Router();

userRouter
  .post("/", createUser)
  .get("/me", verifyToken, getCurrentUser)
  .get("/", getUsers)
  .get("/:id", getUserById)
  .delete("/:id", deleteUserById)
  .put("/:id", updateUserById);
