import mongoose, { Schema } from "mongoose";

export type ActiveUsers = mongoose.Document & {
  action: string;
  details?: Record<string, unknown>;
};

const activitySchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Admin" },
    action: { type: String, required: true },
    details: { type: Object },
  },
  { timestamps: true }
);

export const ActiveUsersModel = mongoose.model<ActiveUsers>(
  "ActiveUsers",
  activitySchema
);
