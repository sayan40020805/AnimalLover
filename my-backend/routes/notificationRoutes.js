import express from 'express';
import { getVolunteerNotifications, markNotificationAsRead } from '../controllers/volunteerController.js';
import NotificationModel from '../models/Notification.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Get notifications for a volunteer
router.get('/volunteer/:id', protect, getVolunteerNotifications);

// Mark notification as read
router.put('/:notificationId/read', protect, markNotificationAsRead);

// Get unread notification count
router.get('/volunteer/:id/unread-count', protect, async (req, res) => {
  try {
    const count = await NotificationModel.countDocuments({
      recipient: req.params.id,
      isRead: false
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
