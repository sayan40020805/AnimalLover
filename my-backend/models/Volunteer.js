// models/Volunteer.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
  },
  {
    timestamps: true,
  }
);

// 🔒 Hash password before saving
volunteerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔐 Compare entered password with stored hashed password
volunteerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
