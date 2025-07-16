import express from 'express';
import {
  postAnimal,
  getAnimals,
  deleteAnimal,
} from '../controllers/animalController.js';

const router = express.Router();

router.post('/', postAnimal);
router.get('/', getAnimals);
router.delete('/:id', deleteAnimal); // now fixed

export default router;
