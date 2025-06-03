import mongoose from "mongoose";

const postchema = new mongoose.Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: String,
  Date: String,
  country: String,
  city: String,
  images: [String],
  people: Number,
  startDate: Date,
  endDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Postmodel = mongoose.model("Post", postchema);
