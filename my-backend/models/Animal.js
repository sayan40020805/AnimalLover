import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
    },
    animalType: {
      type: String,
      required: true, // e.g., Dog, Cat, Bird
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: '', // Optional field; defaults to empty string if not provided
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    healthStatus: {
      type: String,
      enum: ['Healthy', 'Sick', 'Injured'],
      default: 'Healthy',
    },
    isAdopted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // or 'Volunteer' if needed
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;
