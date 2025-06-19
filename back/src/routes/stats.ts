import express from "express";
import { getActiveUsers, getUsers } from "../controller/admin";

export const adminRouter = express.Router();

adminRouter.get("/", getUsers).get("/isOnline", getActiveUsers);
