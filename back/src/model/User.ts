import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: function (this: any): boolean {
        return !this.provider;
      },
    },
    role: {
      type: String,
      enum: ["Tourist", "Admin", "Guide"],
      default: "Tourist",
    },

    provider: {
      type: String,
      enum: ["google", "github", "facebook", null],
      default: null,
    },
    provider_id: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
