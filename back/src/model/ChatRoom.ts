import { Schema, model, Document, Types } from "mongoose";

export interface IChatRoom extends Document {
  participants: Types.ObjectId[]; // Users in the chat
  isGroupChat: boolean; // 1-on-1 or group
  name?: string; // Group name if applicable
  groupImage?: string; // Optional group image
  roomId: string; // Unique room ID
  lastMessage?: Types.ObjectId; // Last message ref (optional)
  seen: boolean; // For quick check of read status
  deleted: boolean; // Soft delete
  createdAt: Date;
  updatedAt: Date;
}

const ChatRoomSchema = new Schema<IChatRoom>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isGroupChat: { type: Boolean, default: false },
    name: String,
    groupImage: String,
    roomId: { type: String, unique: true },
    lastMessage: { type: Schema.Types.ObjectId, ref: "ChatMessage" },
    seen: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ChatRoomModel = model<IChatRoom>("ChatRoom", ChatRoomSchema);
