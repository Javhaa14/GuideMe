// models/ChatMessage.ts
import mongoose, { Schema, Document } from "mongoose";

interface IChatMessage extends Document {
  user: string;
  text: string;
  profileImage?: string;
  timestamp: Date;
  roomId?: string;
}

const ChatMessageSchema = new mongoose.Schema(
  {
    user: String,
    userId: String,
    text: String,
    profileImage: String,
    roomId: String,
    readBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const ChatMessageModel =
  mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", ChatMessageSchema);
