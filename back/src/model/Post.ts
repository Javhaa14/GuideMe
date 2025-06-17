import mongoose from "mongoose";

const postchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tourist",
    required: true,
  },
  content: String,
  country: String,
  city: String,
  images: [String],
  activities: [String],
  people: Number,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  startDate: Date,
  endDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Postmodel = mongoose.model("Post", postchema);
