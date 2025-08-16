// controllers/userController.js

import User from '../models/User.js';
import Volunteer from '../models/Volunteer.js';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// ✅ Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Role to Model mapping
const roleModels = {
  user: User,
  volunteer: Volunteer,
  admin: Admin,
};


// ✅ Shared registration for user, volunteer, admin
export const register = async (req, res) => {
  try {
    const { role, name, email, phone, password, location } = req.body;
    const Model = roleModels[role];
    if (!Model) return res.status(400).json({ message: 'Invalid role.' });

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const exists = await Model.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered.' });

    let data = { name, email, password };
    if (role === 'user') data.phone = phone;
    if (role === 'volunteer') {
      data.phone = phone;
      data.location = location;
      data.isApproved = false;
    }

    const newUser = await Model.create(data);
    const token = generateToken(newUser._id, role);

    let userInfo = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role,
    };
    if (role === 'user') userInfo.phone = newUser.phone;
    if (role === 'volunteer') {
      userInfo.phone = newUser.phone;
      userInfo.location = newUser.location;
      userInfo.isApproved = newUser.isApproved;
    }

    res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      user: userInfo,
      token,
    });
  } catch (error) {
    console.error('❌ Register Error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

<<<<<<< HEAD
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
=======
// ✅ Shared login for user, volunteer, admin
>>>>>>> d0af3953aaa041f10c9ea5afc53a3cebf2c851c2
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

<<<<<<< HEAD
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
=======
    // Hardcoded admin login (can login with any role selected)
    if (
      email === 'admin2004@gmail.com' &&
      password === 'sayan40028050'
    ) {
      const token = generateToken('admin-id', 'admin');
      return res.status(200).json({
        message: 'Admin login successful',
        user: {
          _id: 'admin-id',
          name: 'Admin',
          email,
          role: 'admin',
        },
        token,
      });
>>>>>>> d0af3953aaa041f10c9ea5afc53a3cebf2c851c2
    }

    const Model = roleModels[role];
    if (!Model) return res.status(400).json({ message: 'Invalid role' });

    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: `${role} not found` });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    if (role === 'volunteer' && !user.isApproved)
      return res.status(403).json({ message: 'Volunteer not approved yet' });

    const token = generateToken(user._id, role);

    let userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role,
    };
    if (role === 'user') userInfo.phone = user.phone;
    if (role === 'volunteer') {
      userInfo.phone = user.phone;
      userInfo.location = user.location;
      userInfo.isApproved = user.isApproved;
    }

    res.status(200).json({
      message: 'Login successful',
      user: userInfo,
      token,
    });
  } catch (error) {
    console.error('❌ Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// ✅ Get current user/volunteer/admin
export const getCurrentUser = async (req, res) => {
  try {
    const { id, role } = req.user;
    const Model = roleModels[role];
    const user = await Model.findById(id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    console.error('❌ Get Profile Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};
