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

import protectAdmin from "../middleware/protectAdmin.js";

const router = express.Router();

// Routes accessible only to authenticated admin users
router.get("/pending", protectAdmin, getPendingVolunteers);
router.patch(":id/approve", protectAdmin, approveVolunteer);

// Volunteer dashboard routes
router.get("/reports/all", protect, getAllReports);
router.get("/reports/:type/:id", protect, getReportDetails);
router.patch("/reports/:type/:id/status", protect, updateReportStatus);

export default router;
