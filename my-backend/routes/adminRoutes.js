import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import protectAdmin from '../middleware/protectAdmin.js';
import { deleteAnimal } from '../controllers/animalController.js';
import { getPendingVolunteers } from '../controllers/volunteerController.js';

const router = express.Router();

// Admin authentication
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/pending-volunteers', protectAdmin, getPendingVolunteers);

// Protected admin actions
router.delete('/animal/:id', protectAdmin, deleteAnimal);

export default router;
