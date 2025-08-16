// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Volunteer from '../models/Volunteer.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Handle admin token
      if (decoded.role === 'admin') {
        req.user = {
          id: 'admin001',
          role: 'admin',
          name: 'Admin',
          email: 'admin2004@gmail.com',
        };
        return next();
      }

      // Handle user and volunteer tokens
      const Model = decoded.role === 'volunteer' ? Volunteer : User;
      const user = await Model.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = {
        id: user._id,
        role: decoded.role,
        name: user.name,
        email: user.email,
      };

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;
