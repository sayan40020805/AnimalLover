import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Volunteer from '../models/Volunteer.js';

// Helper: Generate JWT Token
const generateToken = (user, role) => {
  return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ✅ User Registration
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone)
      return res.status(400).json({ message: 'All fields required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = await User.create({ name, email, phone, password });

    res.status(201).json({
      message: 'User registered',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: 'user',
      },
      token: generateToken(newUser, 'user'),
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Volunteer Registration
export const registerVolunteer = async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;

    if (!name || !email || !password || !phone || !location)
      return res.status(400).json({ message: 'All fields required' });

    const existing = await Volunteer.findOne({ email });
    if (existing)
      return res.status(400).json({ message: 'Volunteer already exists' });

    const newVolunteer = await Volunteer.create({
      name,
      email,
      phone,
      location,
      password,
      isApproved: false, // 🚨 Make sure this field exists in your model
    });

    res.status(201).json({
      message: 'Volunteer registered successfully. Waiting for approval.',
      volunteer: {
        id: newVolunteer._id,
        name: newVolunteer.name,
        email: newVolunteer.email,
        role: 'volunteer',
        location: newVolunteer.location,
      },
      token: generateToken(newVolunteer, 'volunteer'),
    });
  } catch (err) {
    console.error('Volunteer Register Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Login (User, Volunteer, Admin)
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role)
      return res.status(400).json({ message: 'Missing credentials' });

    // 🚨 Admin Login (Hardcoded)
    if (email === 'admin2004@gmail.com' && password === 'sayan40028050') {
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.json({
        message: 'Admin login successful',
        token,
        user: { email, name: 'Admin', role: 'admin', id: 'admin001' },
      });
    }

    let account;

    if (role === 'user') {
      account = await User.findOne({ email });
    } else if (role === 'volunteer') {
      account = await Volunteer.findOne({ email });
    }

    if (!account)
      return res.status(404).json({ message: `${role} not found` });

    const isMatch = await account.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: 'Incorrect password' });

    if (role === 'volunteer' && !account.isApproved)
      return res.status(403).json({ message: 'Volunteer not approved yet' });

    res.status(200).json({
      message: 'Login successful',
      token: generateToken(account, role),
      user: {
        id: account._id,
        name: account.name,
        email: account.email,
        role,
        ...(role === 'volunteer' && { location: account.location }),
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
