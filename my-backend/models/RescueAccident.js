import mongoose from 'mongoose';

const rescueAccidentSchema = new mongoose.Schema(
  {
    animalType: {
      type: String,
      required: true,
      trim: true, // Example: Dog, Cow, Monkey
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Filename or URL (e.g., if using Cloudinary or local uploads)
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
      enum: ['Pending', 'Responded', 'Resolved'],
      default: 'Pending',
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

const RescueAccident = mongoose.model('RescueAccident', rescueAccidentSchema);

export default RescueAccident;
