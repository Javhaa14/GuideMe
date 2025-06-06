import mongoose from "mongoose";

const guideschema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: String,
  firstName: String,
  lastName: String,
  gender: String,
  price: {
    type: String,
    validate: {
      validator: function (value: string) {
        return value === "FREE" || !isNaN(Number(value));
      },
      message: "Price must be 'FREE' or a number string",
    },
  },
  languages: [String],
  status: {
    type: String,
    enum: ["available", "inavailable", "busy"],
    default: "available",
    required: true,
  },
  rating: Number,

  // ✅ Changed to an array of ObjectIds referencing Comment model
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  experience: String,
  about: String,
  SocialAddress: String,
  car: {
    type: String,
    enum: ["baigaa", "baihgu"],
    default: "baihgu",
    required: true,
  },
  activities: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Guidemodel = mongoose.model("Guide", guideschema);
