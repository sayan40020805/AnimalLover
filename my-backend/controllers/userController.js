// controllers/userController.js

import User from '../models/User.js';
import Volunteer from '../models/Volunteer.js';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// ✅ Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ✅ User registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Let model handle hashing in pre('save')
    const newUser = await User.create({ name, email, phone, password });
    const token = generateToken(newUser._id, 'user');

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('❌ Register User Error:', error.message);
    res.status(500).json({ message: 'Server error during user registration' });
  }
};

// ✅ Volunteer registration
export const registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, password, location } = req.body;

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const volunteerExists = await Volunteer.findOne({ email });
    if (volunteerExists) {
      return res.status(400).json({ message: 'Volunteer already exists' });
    }

    // Let model handle hashing
    const newVolunteer = await Volunteer.create({ name, email, phone, location, password });
    const token = generateToken(newVolunteer._id, 'volunteer');

    res.status(201).json({
      message: 'Volunteer registered successfully',
      volunteer: {
        id: newVolunteer._id,
        name: newVolunteer.name,
        email: newVolunteer.email,
        location: newVolunteer.location,
      },
      token,
    });
  } catch (error) {
    console.error('❌ Register Volunteer Error:', error.message);
    res.status(500).json({ message: 'Server error during volunteer registration' });
  }
};

// ✅ Login (user, volunteer, or admin)
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 🚨 Admin Login (Hardcoded)
    if (role === 'admin' && email === 'admin2004@gmail.com' && password === 'sayan40028050') {
      const token = jwt.sign({ id: 'admin001', role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.status(200).json({
        message: 'Admin login successful',
        token,
        admin: { 
          id: 'admin001', 
          email: 'admin2004@gmail.com', 
          name: 'Admin', 
          role: 'admin' 
        },
      });
    }

    if (!['user', 'volunteer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const Model = role === 'user' ? User : Volunteer;
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: `${role} not found` });

    // ✅ Correct way to compare hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    if (role === 'volunteer' && !user.isApproved)
      return res.status(403).json({ message: 'Volunteer not approved yet' });

    const token = generateToken(user._id, role);

    res.status(200).json({
      message: 'Login successful',
      [role]: {
        id: user._id,
        name: user.name,
        email: user.email,
        ...(role === 'volunteer' && { location: user.location }),
      },
      token,
    });
  } catch (error) {
    console.error('❌ Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// ✅ Get current user/volunteer
export const getCurrentUser = async (req, res) => {
  try {
    const { id, role } = req.user;
    const Model = role === 'user' ? User : Volunteer;
    const user = await Model.findById(id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    console.error('❌ Get Profile Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};
