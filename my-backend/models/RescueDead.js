import mongoose from 'mongoose';

const rescueDeadSchema = new mongoose.Schema(
  {
    animalType: {
      type: String,
      required: true,
      trim: true, // e.g., Dog, Cow, Bird
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // File path or cloud storage URL
      default: '',
    },
    reporterName: {
      type: String,
      required: true,
      trim: true,
    },
    reporterPhone: {
      type: String,
      required: true,
      trim: true,
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
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    default: null,
  },
  },
  {
    timestamps: true,
  }
);

const RescueDead = mongoose.model('RescueDead', rescueDeadSchema);

export default RescueDead;
