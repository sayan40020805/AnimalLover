import express from 'express';
const router = express.Router();
import { getAllReports, getReportDetails, updateReportStatus } from '../controllers/volunteerDashboardController.js';
import protect from '../middleware/authMiddleware.js';

// GET all reports for volunteer dashboard
router.get('/all', protect, getAllReports);

// GET report details by ID
router.get('/:id', protect, getReportDetails);

// PUT update report status
router.put('/:id/status', protect, updateReportStatus);

export default router;
