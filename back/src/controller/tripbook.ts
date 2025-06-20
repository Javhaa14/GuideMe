import { Request, Response } from "express";
import { TripBookingModel } from "../model/Tripbook";
import { TripPlanModel } from "../model/TripPlan";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { tripPlanId, touristId, numberOfPeople, selectedDate, paymentId } =
      req.body;

    if (!tripPlanId || !touristId || !numberOfPeople || !selectedDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const tripPlan = await TripPlanModel.findById(tripPlanId);
    if (!tripPlan) {
      return res.status(404).json({ error: "Trip plan not found" });
    }

    const touristIdsArray = Array.isArray(touristId) ? touristId : [touristId];

    // 🔍 Check for existing booking with same tripPlanId and selectedDate
    const existingBooking = await TripBookingModel.findOne({
      tripPlanId,
      selectedDate,
    });

    if (existingBooking) {
      // ✅ Update the existing booking
      const updatedBooking = await TripBookingModel.findByIdAndUpdate(
        existingBooking._id,
        {
          $addToSet: { touristIds: { $each: touristIdsArray } }, // avoid duplicates
          $inc: { numberOfPeople: numberOfPeople },
          $set: {
            paymentId,
            paymentStatus: "paid",
            totalPrice:
              (existingBooking.totalPrice || 0) +
              tripPlan.price * numberOfPeople,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Existing booking updated successfully",
        booking: updatedBooking,
      });
    }

    // ❌ No booking found — create a new one
    const totalPrice = tripPlan.price * numberOfPeople;

    const newBooking = await TripBookingModel.create({
      tripPlanId,
      touristIds: touristIdsArray,
      guideId: tripPlan.guideId,
      numberOfPeople,
      selectedDate,
      totalPrice,
      paymentId,
      paymentStatus: "paid",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating or updating booking:", error);
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
      .populate("touristIds")
      .populate("guideId")
      .sort({ createdAt: -1 });

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
      .populate("touristIds")
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
      touristIds: touristId,
    })
      .populate("tripPlanId")
      .populate("guideId")
      .populate("touristIds")
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
    console.log("Booking update request body:", req.body);

    const { touristId, cancelTouristId } = updateData;
    delete updateData.touristId;
    delete updateData.cancelTouristId;
    console.log("Computed updateData:", updateData);

    let updatedBooking;

    if (cancelTouristId) {
      const { numberOfPeople: numPeopleToRemove } = req.body;
      if (!numPeopleToRemove) {
        return res
          .status(400)
          .json({ error: "Number of people to remove required" });
      }

      const booking = await TripBookingModel.findById(bookingId).populate(
        "tripPlanId"
      );
      if (!booking) return res.status(404).json({ error: "Booking not found" });

      if (!booking.touristIds.includes(cancelTouristId)) {
        return res.status(400).json({ error: "Tourist not found in booking" });
      }

      const newNumberOfPeople = booking.numberOfPeople - numPeopleToRemove;
      const pricePerPerson = booking.tripPlanId.price || 0;
      const newTotalPrice =
        booking.totalPrice - pricePerPerson * numPeopleToRemove;

      updatedBooking = await TripBookingModel.findByIdAndUpdate(
        bookingId,
        {
          $pull: { touristIds: cancelTouristId },
          $set: {
            numberOfPeople: newNumberOfPeople,
            totalPrice: newTotalPrice,
            ...updateData,
          },
        },
        { new: true }
      );

      // mark cancelled if needed
      if (newNumberOfPeople <= 0) {
        updatedBooking.status = "cancelled";
        await updatedBooking.save();
      }
    } else {
      // Normal update
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
      message: cancelTouristId
        ? "Booking cancelled for tourist successfully"
        : "Booking updated successfully",
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
