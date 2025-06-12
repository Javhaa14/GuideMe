// models/ChatMessage.ts
import mongoose, { Schema, Document } from "mongoose";

interface IChatMessage extends Document {
  user: string;
  text: string;
  profileImage?: string;
  timestamp: Date;
  roomId?: string; // Optional if you support rooms/chats
}

const ChatMessageSchema = new Schema<IChatMessage>({
  user: { type: String, required: true },
  text: { type: String, required: true },
  profileImage: String,
  timestamp: { type: Date, default: Date.now },
  roomId: String,
});

export const ChatMessageModel =
  mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", ChatMessageSchema);
