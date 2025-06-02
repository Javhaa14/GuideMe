import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    role: {
      type: String,
      enum: ["Tourist", "Admin", "Guide"],
      default: "Tourist",
    },
  },
  { timestamps: true }
);
export const UserModel = mongoose.model("User", userSchema);
