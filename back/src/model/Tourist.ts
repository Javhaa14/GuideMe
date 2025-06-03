import mongoose from "mongoose";

const touristschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  languages: [String],
  location: String,
  profileimage: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Touristmodel = mongoose.model("Tourist", touristschema);
