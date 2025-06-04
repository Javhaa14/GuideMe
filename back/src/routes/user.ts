import express from "express";
import {
  createUser,
  deleteUserById,
  getCurrentUser,
  getUserById,
  getUsers,
  updateUserById,
} from "../controller/User";
import { verifyToken } from "../middleware/auth";

export const userRouter = express.Router();

userRouter
  .post("/", createUser as any)
  .get("/me", verifyToken as any, getCurrentUser as any)

  .get("/", getUsers as any)
  .get("/:id", getUserById as any)
  .delete("/:id", deleteUserById as any)
  .put("/:id", updateUserById as any);
