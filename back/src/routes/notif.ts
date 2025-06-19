import express from "express";
import { getnotif } from "../controller/notif";

export const notifRouter = express.Router();

notifRouter.get("/", getnotif);
