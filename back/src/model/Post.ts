import mongoose from "mongoose";

const postchema = new mongoose.Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tourist",
    required: true,
  },
  content: String,
  Date: String,
  country: String,
  city: String,
  images: [String],
  people: Number,
  startDate: Object,
  endDate: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Postmodel = mongoose.model("Post", postchema);
