import mongoose, { Schema, Document } from "mongoose";

interface IChatMessage extends Document {
  user: string;
  text: string;
  profileimage?: string;
  timestamp: Date;
  roomId?: string;
}

const ChatMessageSchema = new mongoose.Schema(
  {
    user: String,
    userId: String,
    text: String,
    profileimage: String,
    roomId: String,
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export const ChatMessageModel =
  mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", ChatMessageSchema);
