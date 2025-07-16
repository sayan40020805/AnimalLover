// routes/authRoutes.js
import express from 'express';
import {
  loginUser,
  signupUser,
} from '../controllers/authController.js';

const router = express.Router();

// Route for user signup
router.post('/signup', signupUser);

// Route for user login
router.post('/login', loginUser);

export default router;
