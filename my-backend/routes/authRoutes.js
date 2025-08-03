// routes/authRoutes.js
import express from 'express';
import {
  signupUser,
  registerVolunteer,
  loginUser, // ✅ Correct function name
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register/user', signupUser);
router.post('/register/volunteer', registerVolunteer);
router.post('/login', loginUser);

export default router;
