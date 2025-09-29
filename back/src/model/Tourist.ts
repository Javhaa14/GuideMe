import mongoose from "mongoose";

const touristschema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "male", "female", "other"],
      default: "Other",
    },
    languages: [String],
    location: String,
    profileimage: String,
    backgroundimage: String,
    socialAddress: String,
    about: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);
export const Touristmodel = mongoose.model("Tourist", touristschema);
