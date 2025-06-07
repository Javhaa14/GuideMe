import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  availability: [
    {
      date: {
        type: String, // ISO format date string
        required: true,
      },
      status: {
        type: String,
        enum: ["available", "busy", "booked"],
        required: true,
      },
    },
  ],
});

export const AvailabilityModel = mongoose.model(
  "Availability",
  AvailabilitySchema
);
