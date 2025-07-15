const express = require("express");
const router = express.Router();
const Volunteer = require("../../models/Volunteer");

// POST /api/volunteers/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, location } = req.body;

    const existing = await Volunteer.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Volunteer already exists." });

    const newVolunteer = new Volunteer({ name, email, phone, password, location });
    await newVolunteer.save();

    res.status(201).json({ success: true, message: "Volunteer registered successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
