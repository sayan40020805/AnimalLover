import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Volunteer from '../models/Volunteer.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const Model = decoded.role === 'user' ? User : Volunteer;
      const user = await Model.findById(decoded.id).select('-password');

      if (!user) throw new Error();

      req.user = { id: user._id, role: decoded.role };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
