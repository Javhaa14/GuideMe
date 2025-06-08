import express from "express";
import {
  createTouristProfile,
  getTouristByuserId,
  getTourists,
  updateTouristProfile,
} from "../controller/touristProfile";

export const touristRouter = express.Router();

touristRouter
  .post("/", createTouristProfile)
  .get("/", getTourists)
  .get("/:_id", getTouristByuserId)
  .put("/", updateTouristProfile);
