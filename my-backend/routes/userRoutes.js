// routes/userRoutes.js
import express from 'express';
import {
  register,
  login,
  getCurrentUser,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Unified registration endpoint
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);

export default router;
