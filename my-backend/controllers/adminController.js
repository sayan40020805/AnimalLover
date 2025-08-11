import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Admin Register
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const admin = await Admin.create({ name, email, password });

  res.status(201).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    token: generateToken(admin._id, 'admin'),
  });
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin login support
  if (email === 'admin2004@gmail.com' && password === 'sayan40028050') {
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.json({
        _id: admin._id,
        name: admin.name,
        email,
        token: generateToken(admin._id, 'admin'),
      });
    } else {
      return res.status(401).json({ message: 'Admin not found in database' });
    }
  }

  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id, 'admin'),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
