import { Request, Response } from "express";
import mongoose from "mongoose";
import { TripPlanModel } from "../model/TripPlan";
import { Guidemodel } from "../model/Guide";

export const createTripPlan = async (req: Request, res: Response) => {
  try {
    const tripPlan = await TripPlanModel.create(req.body);
    res.status(201).json({ success: true, tripPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getAllTripPlans = async (_req: Request, res: Response) => {
  try {
    const tripPlans = await TripPlanModel.find().populate("guideId");
    res.status(200).json({ success: true, tripPlans });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getTripPlanById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid trip plan ID",
    });
  }

  try {
    const tripPlan = await TripPlanModel.findById(id).populate("guideId");

    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        message: "Trip plan not found",
      });
    }

    res.status(200).json({ success: true, tripPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getTripPlansByGuideId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid guide ID" });
  }

  try {
    const tripPlans = await TripPlanModel.find({ guideId: userid });

    if (!tripPlans || tripPlans.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trip plans found for this guide",
      });
    }

    res.status(200).json({ success: true, tripPlans });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const updateTripPlan = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid trip plan ID" });
  }

  try {
    const tripPlan = await TripPlanModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("guideId");

    if (!tripPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Trip Plan not found" });
    }

    res.status(200).json({ success: true, tripPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const deleteTripPlan = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid trip plan ID" });
  }

  try {
    const tripPlan = await TripPlanModel.findByIdAndDelete(id);
    if (!tripPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Trip Plan not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Trip Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
