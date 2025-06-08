import express from "express";
import {
  createGuideProfile,
  getGuideByuserId,
  getGuides,
  updateGuideProfile,
} from "../controller/guideProfile";

export const guideRouter = express.Router();

guideRouter
  .post("/", createGuideProfile)
  .get("/", getGuides)
  .get("/:_id", getGuideByuserId)
  .put("/", updateGuideProfile);
