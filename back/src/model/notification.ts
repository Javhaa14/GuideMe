import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    message: { type: String, required: true },
    roomId: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationModel =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
