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
<<<<<<< HEAD
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
=======
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      likedAt: { type: Date, default: Date.now },
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    },
  ],
  startDate: Date,
  endDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Postmodel = mongoose.model("Post", postchema);
