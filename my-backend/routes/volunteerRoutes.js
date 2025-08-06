// routes/volunteerRoutes.js
import express from "express";
import { getPendingVolunteers, approveVolunteer } from "../controllers/volunteerController.js";
import isAdmin from "../middleware/isAdmin.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pending", protect, isAdmin, getPendingVolunteers);
router.patch("/:id/approve", protect, isAdmin, approveVolunteer);

export default router;
