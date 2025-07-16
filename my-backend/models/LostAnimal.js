import mongoose from 'mongoose';

const lostAnimalSchema = new mongoose.Schema(
  {
    animalType: {
      type: String,
      required: true,
      trim: true, // e.g., Dog, Cat, Cow
    },
    description: {
      type: String,
      required: true,
    },
    lastSeenLocation: {
      type: String,
      required: true,
    },
    image: {
      type: String, // You can store image filename, URL, or base64
    },
    reporterName: {
      type: String,
      required: true,
    },
    reporterPhone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Lost', 'Found', 'Resolved'],
      default: 'Lost',
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LostAnimal = mongoose.model('LostAnimal', lostAnimalSchema);

export default LostAnimal;
