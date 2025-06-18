import { Request, Response } from "express";
import { TripBookingModel } from "../model/Tripbook";
import { TripPlanModel } from "../model/TripPlan";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      tripPlanId,
      touristId,
      numberOfPeople,
      selectedDate,
      paymentMethod,
    } = req.body;

    // Check if TripPlan exists
    const tripPlan = await TripPlanModel.findById(tripPlanId);
    if (!tripPlan) {
      return res.status(404).json({ error: "Trip plan not found" });
    }
    if (!tripPlanId || !touristId || !numberOfPeople || !selectedDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Calculate total price
    const totalPrice = tripPlan.price * numberOfPeople;

    // Create booking
    const booking = await TripBookingModel.create({
      tripPlanId,
      touristId,
      guideId: tripPlan.guideId,
      numberOfPeople,
      selectedDate,
      totalPrice,
      paymentStatus: "unpaid",
      paymentDetails: {
        paymentMethod,
      },
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
    const bookings = await TripBookingModel.find()
      .populate("tripPlanId") // Get trip plan details
      .populate("touristId") // Get tourist info
      .populate("guideId") // Get guide info
      .sort({ createdAt: -1 }); // Latest bookings first

    res.status(200).json({ bookings });
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
    const updateData = req.body;

    const updatedBooking = await TripBookingModel.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true }
    );

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
