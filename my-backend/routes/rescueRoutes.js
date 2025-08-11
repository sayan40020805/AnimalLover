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
import protect from '../middleware/authMiddleware.js'; // ✅ auth middleware

const router = express.Router();

// ✅ Multer setup
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

// ✅ LOST animal (no auth needed)
router.post('/lost', upload.single('image'), reportLostAnimal);
router.get('/lost', getAllLostAnimals);

// ✅ ACCIDENT (now protected ✅)
router.post('/accident', protect, upload.single('image'), reportAccident);
router.get('/accident', getAllAccidents);

// ✅ DEAD animal (protected)
router.post('/dead', protect, upload.single('image'), reportDeadAnimal);
router.get('/dead', getAllDeadAnimals);

export default router;
