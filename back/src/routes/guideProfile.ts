import express from "express";
import {
  createGuideProfile,
  getAvailability,
  getGuideByuserId,
  getGuides,
  saveAvailability,
  updateGuideProfile,
} from "../controller/guideProfile";

export const guideRouter = express.Router();

guideRouter
  .post("/", createGuideProfile)
  .get("/", getGuides)
  .get("/availability", getAvailability)
  .get("/:_id", getGuideByuserId)
  .put("/", updateGuideProfile)
  .put("/availability/:userId", saveAvailability);
