import mongoose from "mongoose";

const commentschema = new mongoose.Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tourist",
    required: true,
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gprofile",
    required: true,
  },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Commentmodel = mongoose.model("Comment", commentschema);
