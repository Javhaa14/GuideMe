import { Router } from "express";
import {
  createTripPlan,
  deleteTripPlan,
  getAllTripPlans,
  getTripPlanById,
  updateTripPlan,
} from "../controller/tripPlan";

const tripPlanRouter = Router();

tripPlanRouter.post("/", createTripPlan);
tripPlanRouter.get("/", getAllTripPlans);
tripPlanRouter.get("/:id", getTripPlanById);
tripPlanRouter.put("/:id", updateTripPlan);
tripPlanRouter.delete("/:id", deleteTripPlan);

export default tripPlanRouter;
