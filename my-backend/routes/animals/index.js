const express = require("express");
const router = express.Router();
const Animal = require("../../models/Animal");

// POST /api/animals/report
router.post("/report", async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/animals
router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find().sort({ createdAt: -1 });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
