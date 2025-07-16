import express from 'express';
import {
  registerUser,
  registerVolunteer,
  login,
  getCurrentUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register/user', registerUser);
router.post('/register/volunteer', registerVolunteer);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);

export default router;
