<<<<<<< HEAD
// backend/routes/adminRoutes.js
import express from "express";
import { getPendingVolunteers, approveVolunteer } from "../controllers/adminController.js";
import isAdmin from "../middleware/isAdmin.js";
import protect from "../middleware/authMiddleware.js"; // your existing auth middleware
=======
import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import protectAdmin from '../middleware/protectAdmin.js';
import { deleteAnimal } from '../controllers/animalController.js';
import { getPendingVolunteers } from '../controllers/volunteerController.js';
>>>>>>> d0af3953aaa041f10c9ea5afc53a3cebf2c851c2

const router = express.Router();

// Admin authentication
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/pending-volunteers', protectAdmin, getPendingVolunteers);

// Protected admin actions
router.delete('/animal/:id', protectAdmin, deleteAnimal);

export default router;
