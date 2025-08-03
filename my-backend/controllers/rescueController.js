import RescueAccident from '../models/RescueAccident.js';
import RescueDead from '../models/RescueDead.js';
import LostAnimal from '../models/LostAnimal.js';

// ------------------ ACCIDENT REPORT ------------------
export const reportAccident = async (req, res) => {
  try {
    const {
      animalType,
      location,
      description,
      reporterName,
      reporterPhone,
    } = req.body;

    if (
      !animalType ||
      !location ||
      !description ||
      !reporterName ||
      !reporterPhone
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newReport = new RescueAccident({
      animalType,
      location,
      description,
      reporterName,
      reporterPhone,
      image: req.file ? req.file.path : null,
      reportedBy: req.user.id, // ✅ User ID from middleware
    });

    await newReport.save();
    res.status(201).json({ message: 'Accident reported successfully', data: newReport });
  } catch (error) {
    console.error('❌ Accident Report Error:', error);
    res.status(500).json({ message: 'Server error while reporting accident' });
  }
};

// ------------------ DEAD ANIMAL REPORT ------------------
export const reportDeadAnimal = async (req, res) => {
  try {
    const {
      animalType,
      location,
      description,
      reporterName,
      reporterPhone,
    } = req.body;

    if (
      !animalType ||
      !location ||
      !description ||
      !reporterName ||
      !reporterPhone
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const report = new RescueDead({
      animalType,
      location,
      description,
      reporterName,
      reporterPhone,
      image: req.file ? req.file.path : null,
      reportedBy: req.user.id, // ✅ User ID from middleware
    });

    await report.save();
    res.status(201).json({ message: 'Dead animal reported successfully', data: report });
  } catch (error) {
    console.error('❌ Dead Animal Report Error:', error);
    res.status(500).json({ message: 'Server error while reporting dead animal' });
  }
};

// ------------------ LOST ANIMAL REPORT ------------------
export const reportLostAnimal = async (req, res) => {
  try {
    const { animalType, location, description, contactInfo } = req.body;

    if (!animalType || !location || !description || !contactInfo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newLost = new LostAnimal({
      animalType,
      location,
      description,
      contactInfo,
      image: req.file ? req.file.path : null,
    });

    await newLost.save();
    res.status(201).json({ message: 'Lost animal reported successfully', data: newLost });
  } catch (error) {
    console.error('❌ Lost Animal Report Error:', error);
    res.status(500).json({ message: 'Server error while reporting lost animal' });
  }
};

// ------------------ GET ALL REPORTS ------------------
export const getAllAccidents = async (req, res) => {
  try {
    const reports = await RescueAccident.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accident reports' });
  }
};

export const getAllDeadAnimals = async (req, res) => {
  try {
    const reports = await RescueDead.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dead animal reports' });
  }
};

export const getAllLostAnimals = async (req, res) => {
  try {
    const lostAnimals = await LostAnimal.find().sort({ createdAt: -1 });
    res.status(200).json(lostAnimals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lost animals' });
  }
};
