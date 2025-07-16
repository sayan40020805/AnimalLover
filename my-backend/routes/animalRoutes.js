// routes/animalRoutes.js
import express from 'express';
import multer from 'multer';
import {
  postAnimal,
  getAnimals,
  deleteAnimal,
} from '../controllers/animalController.js';

const router = express.Router();

// ✅ Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ POST with image upload
router.post('/', upload.single('image'), postAnimal);

// ✅ GET all animals
router.get('/', getAnimals);

// ✅ DELETE by ID
router.delete('/:id', deleteAnimal);

export default router;
