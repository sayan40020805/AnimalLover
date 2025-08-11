// controllers/volunteerController.js
import Volunteer from "../models/Volunteer.js";

// Get all pending volunteers
export const getPendingVolunteers = async (req, res) => {
  try {
    const pending = await Volunteer.find({ isApproved: false });
    res.json({ volunteers: pending });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Approve volunteer
export const approveVolunteer = async (req, res) => {
  const { id } = req.params;
  const volunteer = await Volunteer.findById(id);
  if (!volunteer) return res.status(404).json({ message: "Not found" });

  volunteer.isApproved = true;
  await volunteer.save();
  res.json({ message: "Volunteer approved!" });
};
