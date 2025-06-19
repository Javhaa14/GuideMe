import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: { type: String, required: true },

    text: { type: String, trim: true },
    // Optionally support attachments (images, files, etc)
    attachments: [
      {
        url: String,
        type: String, // "image", "video", "file", etc
      },
    ],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // users who read this message
    deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // optional: soft-delete per user
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export const ChathistoryModel = mongoose.model("Message", messageSchema);
