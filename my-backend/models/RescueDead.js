import mongoose from 'mongoose';

const rescueDeadSchema = new mongoose.Schema(
  {
    animalType: {
      type: String,
      required: true,
      trim: true, // Example: Dog, Cow, Bird
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
      type: String, // Can be a filename or cloud storage URL
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
      enum: ['Pending', 'Verified', 'Cleared'],
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

const RescueDead = mongoose.model('RescueDead', rescueDeadSchema);

export default RescueDead;
