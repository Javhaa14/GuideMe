import mongoose from "mongoose";

export type Stats = mongoose.Document & {
  title: String;
  value: String;
  change: String;
  icon: String;
  color: String;
};

const statsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    value: { type: String, required: true },
    change: { type: String, required: true },
    icon: { type: String, required: false },
    color: { type: String, required: true },
  },
  { timestamps: true }
);
export const StatsModel = mongoose.model<Stats>("stats", statsSchema);
