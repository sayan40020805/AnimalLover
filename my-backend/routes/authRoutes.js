// routes/authRoutes.js
import express from 'express';
import {
  loginUser,
  signupUser,
  registerVolunteer
} from '../controllers/authController.js';

const router = express.Router();

// ✅ Route for user signup
router.post('/signup', signupUser);

// ✅ Route for volunteer registration
router.post('/register/volunteer', registerVolunteer);

// ✅ Route for login (user or volunteer)
router.post('/login', loginUser);

export default router;
