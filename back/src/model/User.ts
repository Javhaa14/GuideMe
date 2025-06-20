import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: function (this: any): boolean {
        return !this.provider;
      },
    },
    role: {
      type: String,
      enum: ["Tourist", "Admin", "Guide"],
      default: "Tourist",
    },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: null },
    provider: {
      type: String,
      enum: ["google", "github", "facebook", null],
      default: null,
    },
    provider_id: {
      type: String,
      unique: true,
      sparse: true,
    },
<<<<<<< HEAD
=======
    notifications: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notifications: [
          { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
        ],
      },
    ],
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
