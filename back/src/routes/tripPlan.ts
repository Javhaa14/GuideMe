import { Router } from "express";
import {
  createTripPlan,
  deleteTripPlan,
  getAllTripPlans,
  getTripPlanById,
  updateTripPlan,
} from "../controller/tripPlan";

export const tripPlanRouter = Router();

tripPlanRouter
  .post("/", createTripPlan)
  .get("/", getAllTripPlans)
  .get("/:id", getTripPlanById)
  .put("/:id", updateTripPlan)
  .delete("/:id", deleteTripPlan);
