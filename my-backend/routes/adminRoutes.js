import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import protectAdmin from '../middleware/protectAdmin.js';
import { deleteAnimal } from '../controllers/animalController.js';
import { getPendingVolunteers, approveVolunteer } from '../controllers/volunteerController.js';

const router = express.Router();

// Admin authentication
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/pending-volunteers', protectAdmin, getPendingVolunteers);
router.put('/approve/:id', protectAdmin, approveVolunteer);

// Protected admin actions
router.delete('/animal/:id', protectAdmin, deleteAnimal);

export default router;
