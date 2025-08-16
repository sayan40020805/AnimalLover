import LostAnimal from '../models/LostAnimal.js';

// GET lost animal reports
export const getLostAnimals = async (req, res) => {
  try {
    const filter = {};
    if (req.query.reportedBy) {
      filter.reportedBy = req.query.reportedBy;
    }
    const lostAnimals = await LostAnimal.find(filter);
    res.status(200).json({ lostAnimals });
  } catch (error) {
    console.error('Get Lost Animals Error:', error);
    res.status(500).json({ message: 'Server error fetching lost animals' });
  }
};
// POST lost animal report
export const reportLostAnimal = async (req, res) => {
  try {
    const {
      animalType,
      description,
      lastSeenLocation,
      reporterName,
      reporterPhone,
    } = req.body;

    if (!animalType || !description || !lastSeenLocation || !reporterName || !reporterPhone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newLostAnimal = new LostAnimal({
      animalType,
      description,
      lastSeenLocation,
      reporterName,
      reporterPhone,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      reportedBy: req.user ? req.user.id : "000000000000000000000000", // fallback if not using auth
    });

    await newLostAnimal.save();
    res.status(201).json({ message: 'Lost animal reported successfully', lostAnimal: newLostAnimal });
  } catch (error) {
    console.error('Report Lost Animal Error:', error);
    res.status(500).json({ message: 'Server error during lost animal report' });
  }
};
