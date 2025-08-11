import express from 'express';
import multer from 'multer';
import { reportLostAnimal, getLostAnimals } from '../controllers/lostAnimalController.js';

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post('/', upload.single('image'), reportLostAnimal);

// GET all lost animal reports (supports ?reportedBy=...)
router.get('/', getLostAnimals);

export default router;
