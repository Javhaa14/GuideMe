import mongoose from 'mongoose';

const gprofileschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tprofile',
    required: true,
  },
  location: String,
  firstName: String,
  lastName: String,
  gender: String,
  price: {
    type: String,
    validate: {
      validator: function (value: string) {
        return value === 'FREE' || !isNaN(Number(value));
      },
      message: "Price must be 'FREE' or a number string",
    },
  },
  languages: [String],
  status: {
    type: String,
    enum: ['available', 'inavailable', 'busy'],
    default: 'available',
    required: true,
  },
  rating: Number,
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  },
  experience: String,
  about: String,
  SocialAddress: String,
  Car: {
    type: String,
    enum: ['baigaa', 'baihgu'],
    default: 'baihgu',
    required: true,
  },
  activities: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export const Gprofilemodel = mongoose.model('Gprofile', gprofileschema);
