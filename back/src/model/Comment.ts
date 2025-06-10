import mongoose from "mongoose";

const commentschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: Number,
  review: String,
  recommend: {
    type: String,
    enum: ["no", "yes"],
    default: "no",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Commentmodel = mongoose.model("Comment", commentschema);
