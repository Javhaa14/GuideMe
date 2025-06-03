import mongoose, { mongo } from 'mongoose';

const guideProfileSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tprofile',
      enum: ['TProfile', 'GProfile'],
      default: 'TProfile',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist',
      required: true,
    },
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    country: { type: String, required: true },
    language: { type: String, required: true },
    about: { type: String },
    activities: [{ type: String }],
    photoUrl: { type: String },
    price: {
      type: String,
      validate: {
        validator: function (value: string) {
          return value === 'FREE' || !isNaN(Number(value));
        },
        message: "Price must be 'FREE' or a number string",
      },
    },
    socialAddress: { type: String, required: true },
    car: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);
export const guideProfileModel = mongoose.model(
  'GuideProfile',
  guideProfileSchema
);
