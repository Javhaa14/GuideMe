<<<<<<< HEAD
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
=======
import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message: string;
  seen: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String },
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Notification = model<INotification>(
  "Notification",
  notificationSchema
);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
