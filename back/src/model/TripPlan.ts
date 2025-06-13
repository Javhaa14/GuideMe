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
    images: {
      type: [String],
      default: [],
    },
    about: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    groupSize: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    route: [
      {
        image: String,
        title: { type: String, required: true },
        about: String,
        iconType: String,
      },
    ],
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
