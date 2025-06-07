import { Router } from "express";
import { getAvailability, saveAvailability } from "../controller/availabilty";

const AvailabilityRouter = Router();

AvailabilityRouter.get("/", getAvailability as any);
AvailabilityRouter.post("/", saveAvailability as any);

export default AvailabilityRouter;
