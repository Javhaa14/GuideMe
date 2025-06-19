import mongoose from "mongoose";
import { Schema, model } from "mongoose";

export interface IChatMessage extends Document {
  sender: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  receiver: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  roomId: { type: String; required: true };
  text: string;
  profileimage?: string;
  seen: boolean;
  deleted: boolean;
  createdAt: Date;
}
const chatSchema = new Schema<IChatMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: String, required: true },
    text: { type: String, required: true },
    profileimage: { type: String },
    seen: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
export const ChatModel = model<IChatMessage>("ChatMessage", chatSchema);
