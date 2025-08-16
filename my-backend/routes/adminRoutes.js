import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import protectAdmin from '../middleware/protectAdmin.js';
import { deleteAnimal } from '../controllers/animalController.js';
import { getAllVolunteers, updateVolunteerStatus } from '../controllers/volunteerController.js';
import Volunteer from '../models/Volunteer.js';

const router = express.Router();

// Admin authentication
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/pending-volunteers', protectAdmin, async (req, res) => {
  try {
    const pendingVolunteers = await Volunteer.find({ status: 'pending' }).select('-password');
    res.json(pendingVolunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/all-volunteers', protectAdmin, getAllVolunteers);
router.put('/approve/:id', protectAdmin, updateVolunteerStatus);

// Protected admin actions
router.delete('/animal/:id', protectAdmin, deleteAnimal);

export default router;
