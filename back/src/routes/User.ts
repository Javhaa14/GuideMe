import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controller/User";

export const userRouter = Router();

userRouter
  .post("/", createUser as any)
  .get("/", getUsers as any)
  .get("/", getUserById as any)
  .delete("/:id", deleteUserById as any)
  .put("/:id", updateUserById as any);
