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
    },
    type: {
      type: String,
      required: true, // e.g., Dog, Cat, Bird
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or base64 or image filename if using multer
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    healthStatus: {
      type: String,
      default: 'Healthy', // e.g., Healthy, Sick, Injured
    },
    isAdopted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // or 'Volunteer' if separate model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;
