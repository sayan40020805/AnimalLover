import Animal from '../models/Animal.js';

// POST a new animal for adoption
export const postAnimal = async (req, res) => {
  try {
    const {
      name,
      age,
      animalType,
      location,
      description,
    } = req.body;

    const createdBy = req.user?.id || req.body.createdBy; // supports token auth or manual ID

    // 🔒 Validate required fields
    if (!name || !age || !animalType || !location || !description || !createdBy) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAnimal = new Animal({
      name,
      age,
      animalType,
      location,
      description,
      createdBy,
      image: req.file ? `/uploads/${req.file.filename}` : '',
    });

    await newAnimal.save();
    res.status(201).json({ message: 'Animal posted successfully', animal: newAnimal });
  } catch (error) {
    console.error('❌ Post Animal Error:', error);
    res.status(500).json({ message: 'Server error during animal submission' });
  }
};

// GET all animals
export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().sort({ createdAt: -1 });
    res.status(200).json(animals);
  } catch (err) {
    console.error('❌ Fetch Animals Error:', err);
    res.status(500).json({ message: 'Failed to fetch animals' });
  }
};

// DELETE an animal by ID
export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (err) {
    console.error('❌ Delete Animal Error:', err);
    res.status(500).json({ message: 'Failed to delete animal' });
  }
};
