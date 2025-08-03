import express from 'express';
import multer from 'multer';
import {
  postAnimal,
  getAnimals,
  deleteAnimal,
} from '../controllers/animalController.js';
import { protect } from '../middleware/authMiddleware.js'; // Optional, use if securing routes

const router = express.Router();

// ✅ Configure Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ POST a new animal (with image)
// Add 'protect' here if user must be logged in to post
router.post('/', upload.single('image'), postAnimal); // 👈 add 'protect,' before 'upload' if needed

// ✅ GET all animals (open to all)
router.get('/', getAnimals);

// ✅ DELETE an animal by ID
// You can protect this with 'protect' and add admin-only logic if needed
router.delete('/:id', deleteAnimal); // 👈 add 'protect,' before if needed

export default router;
