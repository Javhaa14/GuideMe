import mongoose from "mongoose";

const tripPlanSchema = new mongoose.Schema(
  {
    GuideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
      trim: true,
    },
    About: {
      type: String,
    },
    Image: {
      type: String,
    },
    people: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    Activities: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const TripPlanModel =
  mongoose.models.TripPlan || mongoose.model("TripPlan", tripPlanSchema);
