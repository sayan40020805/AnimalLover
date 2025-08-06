// backend/controllers/adminController.js
import Volunteer from "../models/Volunteer.js";

// GET /api/admin/pending-volunteers
export const getPendingVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ isApproved: false });
    res.status(200).json({ success: true, volunteers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// PUT /api/admin/approve/:id
export const approveVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ success: false, message: "Volunteer not found" });
    }

    volunteer.isApproved = true;
    await volunteer.save();

    res.status(200).json({ success: true, message: "Volunteer approved." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
