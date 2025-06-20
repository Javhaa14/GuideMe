<<<<<<< HEAD
// models/ChatMessage.ts
=======
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
    readBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
=======
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
);

export const ChatMessageModel =
  mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", ChatMessageSchema);
