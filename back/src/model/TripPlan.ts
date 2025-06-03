import mongoose from "mongoose";

const tripPlanSchema = new mongoose.Schema(
  {
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gprofile",
      required: true,
    },
    date: {
      type: String,
    },
    location: {
      type: String,
    },
    about: {
      type: String,
    },
    image: {
      type: String,
    },
    people: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
    },
    activities: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const TripPlanModel =
  mongoose.models.TripPlan || mongoose.model("TripPlan", tripPlanSchema);
