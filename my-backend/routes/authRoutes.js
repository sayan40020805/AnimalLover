import express from 'express';
import {
  signupUser,
  registerVolunteer,
  loginUser,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register/user', signupUser);
router.post('/register/volunteer', registerVolunteer);
router.post('/login', loginUser);

export default router;
