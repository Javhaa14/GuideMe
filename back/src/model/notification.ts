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
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Notification = model<INotification>(
  "Notification",
  notificationSchema
);
