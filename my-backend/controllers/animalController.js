// controllers/animalController.js
import Animal from '../models/Animal.js';

export const postAnimal = async (req, res) => {
  try {
    const { name, location, description } = req.body;

    if (!name || !location || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAnimal = new Animal({
      name,
      location,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdBy: '000000000000000000000000', // dummy ID or req.user.id if using auth
    });

    await newAnimal.save();
    res.status(201).json({ message: 'Animal posted successfully', animal: newAnimal });
  } catch (error) {
    console.error('Post Animal Error:', error);
    res.status(500).json({ message: 'Server error during animal submission' });
  }
};

export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch animals' });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete animal' });
  }
};
