<<<<<<< HEAD
import express from 'express';
import {
  createGuideProfile,
=======
import express from "express";
import {
  createGuideProfile,
  editGuideProfile,
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  getAvailability,
  getGuideByuserId,
  getGuides,
  saveAvailability,
  updateGuideProfile,
<<<<<<< HEAD
} from '../controller/guideProfile';
=======
} from "../controller/guideProfile";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

export const guideRouter = express.Router();

guideRouter
<<<<<<< HEAD
  .post('/', createGuideProfile)
  .get('/', getGuides)
  .put('/', updateGuideProfile)
  .put('/availability', saveAvailability)
  .get('/:_id', getGuideByuserId)
  .get('/availability/:userId', getAvailability);
=======
  .post("/", createGuideProfile)
  .get("/", getGuides)
  .put("/", updateGuideProfile)
  .put("/edit/:guideId", editGuideProfile as any)
  .put("/availability", saveAvailability)
  .get("/:_id", getGuideByuserId)
  .get("/availability/:userId", getAvailability);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
