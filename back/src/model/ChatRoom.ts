import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

chatRoomSchema.index(
  { participants: 1 },
  {
    unique: true,
    name: "unique_participants",
  }
);

// Pre-save middleware to ensure participants are always sorted
chatRoomSchema.pre("save", function (next) {
  if (this.isModified("participants")) {
    this.participants = this.participants.sort();
  }
  next();
});

// Add a method to find room by participants
chatRoomSchema.statics.findByParticipants = function (participants: string[]) {
  const sorted = participants.sort();
  return this.findOne({ participants: sorted });
};

export const ChatRoomModel =
  mongoose.models.Chatroom || mongoose.model("Chatroom", chatRoomSchema);
