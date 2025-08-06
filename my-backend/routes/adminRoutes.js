// backend/routes/adminRoutes.js
import express from "express";
import { getPendingVolunteers, approveVolunteer } from "../controllers/adminController.js";
import isAdmin from "../middleware/isAdmin.js";
import { protect } from "../middleware/authMiddleware.js"; // your existing auth middleware

const router = express.Router();

// Must be logged in AND an admin
router.get("/pending-volunteers", protect, isAdmin, getPendingVolunteers);
router.put("/approve/:id", protect, isAdmin, approveVolunteer);

export default router;
