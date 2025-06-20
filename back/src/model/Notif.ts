import mongoose from "mongoose";

const notificationlikeSchema = new mongoose.Schema({
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, required: false }, // ✅ заавал биш ч нэмэх хэрэгтэй
  type: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const NotificationModel =
  mongoose.models.Notificationlike ||
  mongoose.model("Notificationlike", notificationlikeSchema);
