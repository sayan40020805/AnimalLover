import express from 'express';
import multer from 'multer';
import {
  reportAccident,
  getAllAccidents,
  reportDeadAnimal,
  getAllDeadAnimals,
  reportLostAnimal,
  getAllLostAnimals,
} from '../controllers/rescueController.js';

const router = express.Router();

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// LOST animal
router.post('/lost', upload.single('image'), reportLostAnimal);
router.get('/lost', getAllLostAnimals);

// ACCIDENT
router.post('/accident', upload.single('image'), reportAccident);
router.get('/accident', getAllAccidents);

// DEAD animal
router.post('/dead', upload.single('image'), reportDeadAnimal);
router.get('/dead', getAllDeadAnimals);

export default router;
