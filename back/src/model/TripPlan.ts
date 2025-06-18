import mongoose from "mongoose";

const routeItemSchema = new mongoose.Schema(
  {
    image: String,
    title: { type: String, required: true },
    about: String,
    iconType: String,
    name: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { _id: false }
);

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
      default: [],
    },
    groupSize: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    route: {
      type: [routeItemSchema],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    tips: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export const TripPlanModel =
  mongoose.models.TripPlan || mongoose.model("TripPlan", tripPlanSchema);
