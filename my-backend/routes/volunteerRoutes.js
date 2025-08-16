import express from "express";
import {
  getPendingVolunteers,
  approveVolunteer
} from "../controllers/volunteerController.js";
import {
  getAllReports,
  getReportDetails,
  updateReportStatus
} from "../controllers/volunteerDashboardController.js";

import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// Routes accessible only to authenticated admin users
router.get("/pending", protect, isAdmin, getPendingVolunteers);
router.patch("/:id/approve", protect, isAdmin, approveVolunteer);

// Volunteer dashboard routes
router.get("/reports/all", protect, getAllReports);
router.get("/reports/:type/:id", protect, getReportDetails);
router.patch("/reports/:type/:id/status", protect, updateReportStatus);

export default router;
