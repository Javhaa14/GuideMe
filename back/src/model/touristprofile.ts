import mongoose from "mongoose";

const tprofileschema = new mongoose.Schema({
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
export const Tprofilemodel = mongoose.model("Tprofile", tprofileschema);
