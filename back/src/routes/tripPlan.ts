import { Router } from "express";
import {
  createTripPlan,
  deleteTripPlan,
  getAllTripPlans,
<<<<<<< HEAD
=======
  getTripPlanById,
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  getTripPlansByGuideId,
  updateTripPlan,
} from "../controller/tripPlan";

const tripPlanRouter = Router();

tripPlanRouter.post("/", createTripPlan);
tripPlanRouter.get("/", getAllTripPlans);
<<<<<<< HEAD
=======
tripPlanRouter.get("/tripPlan/:id", getTripPlanById);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
tripPlanRouter.get("/:userid", getTripPlansByGuideId);
tripPlanRouter.put("/:id", updateTripPlan);
tripPlanRouter.delete("/:id", deleteTripPlan);

export default tripPlanRouter;
