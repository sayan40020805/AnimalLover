import express from "express";
import {
  getPendingVolunteers,
  approveVolunteer
} from "../controllers/volunteerController.js";

import protect from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Routes accessible only to authenticated admin users
router.get("/pending", protect, isAdmin, getPendingVolunteers);
router.patch("/:id/approve", protect, isAdmin, approveVolunteer);

export default router;
