import mongoose from "mongoose";

const postchema = new mongoose.Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tourist",
    required: true,
  },
  Date: String,
  Country: String,
  City: String,
  Images: [String],
  people: Number,
  startDate: String,
  endDate: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Postmodel = mongoose.model("Post", postchema);
