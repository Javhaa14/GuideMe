import express from "express";
import { createStats, getStats } from "../controller/stats";

export const statsRouter = express.Router();

statsRouter.post("/", createStats).get("/", getStats);
