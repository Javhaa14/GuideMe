import mongoose from "mongoose";

const guideschema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: String,
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
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  availability: [
    {
      date: {
        type: String, // ISO format date string
        required: true,
      },
      status: {
        type: String,
        enum: ["available", "busy", "booked"],
        required: true,
      },
    },
  ],
  profileimage: String,
  backgroundimage: String,
  experience: String,
  about: String,
  SocialAddress: String,
  car: {
    type: String,
    enum: ["true", "false"],
    default: "false",
    required: true,
  },
  activities: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Guidemodel = mongoose.model("Guide", guideschema);
