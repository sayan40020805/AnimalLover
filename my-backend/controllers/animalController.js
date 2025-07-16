import Animal from '../models/Animal.js';

export const postAnimal = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const animal = new Animal({ name, image, description });
    await animal.save();
    res.status(201).json({ message: 'Animal posted successfully', animal });
  } catch (err) {
    res.status(500).json({ message: 'Failed to post animal' });
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
