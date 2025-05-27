import mongoose from "mongoose";

const postchema = new mongoose.Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tourist",
    required: true,
  },
  Date: String,
  Location: String,
  Images: [String],
  people: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Commentmodel = mongoose.model("Comment", postchema);
