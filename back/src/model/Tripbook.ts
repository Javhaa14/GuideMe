import mongoose from "mongoose";

const tripBookingSchema = new mongoose.Schema(
  {
    tripPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TripPlan",
      required: true,
    },
    touristIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tourist",
        required: true,
      },
    ],
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    paymentDetails: {
      paymentMethod: String,
      transactionId: String,
      paidAt: Date,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export const TripBookingModel =
  mongoose.models.TripBooking ||
  mongoose.model("TripBooking", tripBookingSchema);
