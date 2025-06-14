import { Router } from "express";
import {
  createTripPlan,
  deleteTripPlan,
  getAllTripPlans,
  getTripPlansByGuideId,
  updateTripPlan,
} from "../controller/tripPlan";

const tripPlanRouter = Router();

tripPlanRouter.post("/", createTripPlan);
tripPlanRouter.get("/", getAllTripPlans);
tripPlanRouter.get("/:userid", getTripPlansByGuideId);
tripPlanRouter.put("/:id", updateTripPlan);
tripPlanRouter.delete("/:id", deleteTripPlan);

export default tripPlanRouter;
