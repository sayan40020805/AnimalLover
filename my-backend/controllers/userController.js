import User from '../models/User.js';
import Volunteer from '../models/Volunteer.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, phone, password: hashedPassword });
    const token = generateToken(newUser._id, 'user');

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error('❌ Register User Error:', error.message);
    res.status(500).json({ message: 'Server error during user registration' });
  }
};

export const registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, password, location } = req.body;
    const volunteerExists = await Volunteer.findOne({ email });
    if (volunteerExists) return res.status(400).json({ message: 'Volunteer already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVolunteer = await Volunteer.create({
      name,
      email,
      phone,
      location,
      password: hashedPassword,
    });

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

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!['user', 'volunteer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const Model = role === 'user' ? User : Volunteer;
    const user = await Model.findOne({ email });

    if (!user) return res.status(404).json({ message: `${role} not found` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id, role);

    res.status(200).json({
      message: 'Login successful',
      user: {
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
