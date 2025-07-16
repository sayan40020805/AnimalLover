// models/Volunteer.js
import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  password: {
    type: String,
    required: true,
  },
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
