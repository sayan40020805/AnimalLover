// controllers/rescueController.js

import RescueAccident from '../models/RescueAccident.js';
import RescueDead from '../models/RescueDead.js';
import LostAnimal from '../models/LostAnimal.js';

// ------------------ ACCIDENT REPORT ------------------
export const reportAccident = async (req, res) => {
  try {
    const { location, description, reporterName, contact } = req.body;

    const newReport = new RescueAccident({
      location,
      description,
      reporterName,
      contact,
      image: req.file ? req.file.path : null,
    });

    await newReport.save();
    res.status(201).json({ message: 'Accident reported successfully', data: newReport });
  } catch (error) {
    console.error('❌ Accident Report Error:', error);
    res.status(500).json({ message: 'Server error while reporting accident' });
  }
};

export const getAllAccidents = async (req, res) => {
  try {
    const reports = await RescueAccident.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accident reports' });
  }
};

// ------------------ DEAD ANIMAL REPORT ------------------
export const reportDeadAnimal = async (req, res) => {
  try {
    const { location, reporterName, contact, description } = req.body;

    const report = new RescueDead({
      location,
      reporterName,
      contact,
      description,
      image: req.file ? req.file.path : null,
    });

    await report.save();
    res.status(201).json({ message: 'Dead animal reported', data: report });
  } catch (error) {
    console.error('❌ Dead Animal Report Error:', error);
    res.status(500).json({ message: 'Server error while reporting dead animal' });
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

// ------------------ LOST ANIMAL REPORT ------------------
export const reportLostAnimal = async (req, res) => {
  try {
    const { animalType, location, description, contactInfo } = req.body;

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

export const getAllLostAnimals = async (req, res) => {
  try {
    const lostAnimals = await LostAnimal.find().sort({ createdAt: -1 });
    res.status(200).json(lostAnimals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lost animals' });
  }
};

