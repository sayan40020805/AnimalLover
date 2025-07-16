import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Volunteer from '../models/Volunteer.js';

// Helper function to generate JWT
const generateToken = (user, role) => {
  return jwt.sign(
    {
      id: user._id,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ------------------ USER REGISTRATION ------------------
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token: generateToken(newUser, 'user'),
    });
  } catch (error) {
    console.error('User Registration Error:', error);
    res.status(500).json({ message: 'Server error during user registration' });
  }
};

// ------------------ VOLUNTEER REGISTRATION ------------------
export const registerVolunteer = async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;

    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer)
      return res.status(400).json({ message: 'Volunteer already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVolunteer = await Volunteer.create({
      name,
      email,
      phone,
      location,
      password: hashedPassword,
    });

    res.status(201).json({
      volunteer: {
        id: newVolunteer._id,
        name: newVolunteer.name,
        email: newVolunteer.email,
      },
      token: generateToken(newVolunteer, 'volunteer'),
    });
  } catch (error) {
    console.error('Volunteer Registration Error:', error);
    res.status(500).json({ message: 'Server error during volunteer registration' });
  }
};

// ------------------ LOGIN (User or Volunteer) ------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let account;
    if (role === 'user') {
      account = await User.findOne({ email });
    } else if (role === 'volunteer') {
      account = await Volunteer.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: account._id,
        name: account.name,
        email: account.email,
      },
      token: generateToken(account, role),
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
