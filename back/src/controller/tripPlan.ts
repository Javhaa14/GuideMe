import { Request, Response } from "express";
import mongoose from "mongoose";
import { TripPlanModel } from "../model/TripPlan";

// 1. Create Trip Plan
export const createTripPlan = async (req: Request, res: Response) => {
  try {
    const tripPlan = await TripPlanModel.create(req.body);
    return res.status(201).json({ success: true, tripPlan });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message || "Internal server error",
    });
  }
};

// 2. Get All Trip Plans
export const getAllTripPlans = async (_req: Request, res: Response) => {
  try {
    const tripPlans = await TripPlanModel.find().populate("guideId");
    return res.status(200).json({ success: true, tripPlans });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message || "Failed to get trip plans",
    });
  }
};

// 3. Get Trip Plan by ID
export const getTripPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid trip plan ID" });
  }

  try {
    const tripPlan = await TripPlanModel.findById(id).populate("guideId");

    if (!tripPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Trip Plan not found" });
    }

    return res.status(200).json({ success: true, tripPlan });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message || "Failed to fetch trip plan",
    });
  }
};

// 4. Get All Trip Plans by Guide ID
export const getTripPlansByGuideId = async (req: Request, res: Response) => {
  const { userid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid guide ID" });
  }

  try {
    const tripPlans = await TripPlanModel.find({ guideId: userid });

    return res.status(200).json({
      success: true,
      tripPlans,
      message: tripPlans.length > 0 ? undefined : "No trip plans found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message || "Error fetching trip plans",
    });
  }
};

// 5. Update Trip Plan
export const updateTripPlan = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid trip plan ID" });
  }

  try {
    const updatedTripPlan = await TripPlanModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("guideId");

    if (!updatedTripPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Trip Plan not found" });
    }

    return res.status(200).json({ success: true, tripPlan: updatedTripPlan });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message || "Failed to update trip plan",
    });
  }
};

// 6. Delete Trip Plan
export const deleteTripPlan = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid trip plan ID" });
  }

  try {
    const deletedTripPlan = await TripPlanModel.findByIdAndDelete(id);

    if (!deletedTripPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Trip Plan not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Trip Plan deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message || "Failed to delete trip plan",
    });
  }
};
