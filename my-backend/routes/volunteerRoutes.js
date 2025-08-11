import express from "express";
import {
  getPendingVolunteers,
  approveVolunteer
} from "../controllers/volunteerController.js";

import protectAdmin from "../middleware/protectAdmin.js";

const router = express.Router();

// Routes accessible only to authenticated admin users
router.get("/pending", protectAdmin, getPendingVolunteers);
router.patch(":id/approve", protectAdmin, approveVolunteer);

export default router;
