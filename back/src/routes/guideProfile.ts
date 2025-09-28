import express from "express";
import {
  createGuideProfile,
  editGuideProfile,
  getAvailability,
  getGuideByuserId,
  getGuides,
  saveAvailability,
} from "../controller/guideProfile";

export const guideRouter = express.Router();

guideRouter
  .post("/", createGuideProfile)
  .get("/", getGuides)
  .put("/edit/:guideId", editGuideProfile as any)
  .put("/availability", saveAvailability)
  .get("/:_id", getGuideByuserId)
  .get("/availability/:userId", getAvailability);
