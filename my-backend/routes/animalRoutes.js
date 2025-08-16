import express from 'express';
import multer from 'multer';
import {
  postAnimal,
  getAnimals,
  deleteAnimal,
} from '../controllers/animalController.js';
<<<<<<< HEAD
import protect from '../middleware/authMiddleware.js'; // Optional, use if securing routes
=======
import protect from '../middleware/authMiddleware.js'; // Use default import for protect
>>>>>>> d0af3953aaa041f10c9ea5afc53a3cebf2c851c2

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
// If you want only logged-in users to post, use: protect, upload.single('image'), postAnimal
router.post('/', upload.single('image'), postAnimal);

// ✅ GET all animals (open to all)
router.get('/', getAnimals);

// ✅ DELETE an animal by ID
// If you want only logged-in users/admins to delete, use: protect, deleteAnimal
router.delete('/:id', deleteAnimal);

export default router;
