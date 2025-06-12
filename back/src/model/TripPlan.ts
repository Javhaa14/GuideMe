import mongoose from "mongoose";

const tripPlanSchema = new mongoose.Schema(
  {
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
    },
    about: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
    },
    language: {
      type: [String],
      required: true,
    },
    groupSize: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    tripTourImage: {
      type: String,
    },
    tripTourTitle: {
      type: String,
    },
    tripTourAbout: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    highlights: {
      type: [String],
    },
    tips: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const TripPlanModel =
  mongoose.models.TripPlan || mongoose.model("TripPlan", tripPlanSchema);
