import mongoose from 'mongoose';

const TouristProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    activities: {
      type: String,
      default: '',
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const TouristModel = mongoose.model(
  'TouristProfile',
  TouristProfileSchema
);
