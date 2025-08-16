import express from "express";
import {
  getAllVolunteers,
  updateVolunteerStatus
} from "../controllers/volunteerController.js";
import {
  getAllReports,
  getReportDetails,
  updateReportStatus
} from "../controllers/volunteerDashboardController.js";
import Volunteer from "../models/Volunteer.js";

import protectAdmin from "../middleware/protectAdmin.js";
import protect from "../middleware/authMiddleware.js";  // ✅ import protect

const router = express.Router();

// Routes accessible only to authenticated admin users
router.get("/pending", protectAdmin, async (req, res) => {
  try {
    const pendingVolunteers = await Volunteer.find({ status: 'pending' }).select('-password');
    res.json(pendingVolunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/all", getAllVolunteers); // Public endpoint to get all volunteers
router.patch("/:id/approve", protectAdmin, updateVolunteerStatus);  // ✅ fixed missing "/"

// Volunteer dashboard routes
router.get("/reports/all", protect, getAllReports);
router.get("/reports/:type/:id", protect, getReportDetails);
router.patch("/reports/:type/:id/status", protect, updateReportStatus);

export default router;
