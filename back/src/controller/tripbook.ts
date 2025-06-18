import { Request, Response } from "express";
import { TripBookingModel } from "../model/Tripbook";
import { TripPlanModel } from "../model/TripPlan";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { tripPlanId, touristId, numberOfPeople, selectedDate } = req.body;

    // Check required fields
    if (!tripPlanId || !touristId || !numberOfPeople || !selectedDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if TripPlan exists
    const tripPlan = await TripPlanModel.findById(tripPlanId);
    if (!tripPlan) {
      return res.status(404).json({ error: "Trip plan not found" });
    }

    // Calculate total price
    const totalPrice = tripPlan.price * numberOfPeople;

    // Ensure touristId is an array (wrap if it's a single ID)
    const touristIdsArray = Array.isArray(touristId) ? touristId : [touristId];

    // Create booking with touristId as array
    const booking = await TripBookingModel.create({
      tripPlanId,
      touristId: touristIdsArray,
      guideId: tripPlan.guideId,
      numberOfPeople,
      selectedDate,
      totalPrice,
      paymentStatus: "paid",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { tripId, paymentId } = req.query;
    const filter: any = {};
    if (tripId) filter.tripPlanId = tripId;
    if (paymentId) filter["paymentDetails.paymentId"] = paymentId;

    const bookings = await TripBookingModel.find(filter)
      .populate("tripPlanId")
      .populate("touristId")
      .populate("guideId")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookingsByGuideId = async (req: Request, res: Response) => {
  try {
    const { guideId } = req.params;

    const bookings = await TripBookingModel.find({ guideId })
      .populate("tripPlanId")
      .populate("touristId")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching guide bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getBookingsByTouristId = async (req: Request, res: Response) => {
  try {
    const { touristId } = req.params;

    const bookings = await TripBookingModel.find({
      touristId: touristId,
    })
      .populate("tripPlanId")
      .populate("guideId")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings for tourist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const updateData = { ...req.body };

    // Extract touristId if present and remove it from updateData
    const { touristId } = updateData;
    delete updateData.touristId;

    let updatedBooking;

    if (touristId) {
      // Push touristId into array using $addToSet to avoid duplicates
      updatedBooking = await TripBookingModel.findByIdAndUpdate(
        bookingId,
        {
          $addToSet: { touristId: touristId }, // Push touristId into array
          $set: updateData, // update other fields normally
        },
        { new: true }
      );
    } else {
      // No touristId to push, just update normally
      updatedBooking = await TripBookingModel.findByIdAndUpdate(
        bookingId,
        updateData,
        { new: true }
      );
    }

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;

    const deletedBooking = await TripBookingModel.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
      booking: deletedBooking,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
