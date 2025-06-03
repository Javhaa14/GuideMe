import { Router } from "express";
import {
  createTripPlan,
  deleteTripPlan,
  getAllTripPlans,
  getTripPlanById,
  updateTripPlan,
} from "../controller/TripPlan";

export const tripPlanRouter = Router();

tripPlanRouter
  .post("/", createTripPlan as any)
  .get("/", getAllTripPlans as any)
  .get("/:id", getTripPlanById as any)
  .put("/:id", updateTripPlan as any)
  .delete("/:id", deleteTripPlan as any);
