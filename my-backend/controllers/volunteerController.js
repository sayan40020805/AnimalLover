import Volunteer from '../models/Volunteer.js';
import Notification from '../models/Notification.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new volunteer
export const registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, address, skills, availability, password, location } = req.body;

    // Check if volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ message: 'Volunteer already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new volunteer
    const volunteer = new Volunteer({
      name,
      email,
      phone,
      address,
      skills,
      availability,
      password: hashedPassword,
      status: 'pending',
      isApproved: false,
      location: location || {
        coveredAreas: [],
        currentLocation: { lat: 0, lng: 0 }
      }
    });

    await volunteer.save();
    
    // Generate token
    const token = jwt.sign({ id: volunteer._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      message: 'Volunteer registered successfully',
      token,
      volunteer: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        status: volunteer.status,
        isApproved: volunteer.isApproved
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Volunteer login
export const loginVolunteer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if volunteer exists
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: volunteer._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: 'Login successful',
      token,
      volunteer: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        status: volunteer.status,
        isApproved: volunteer.isApproved,
        location: volunteer.location
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all volunteers
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().select('-password');
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get volunteer by ID
export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id).select('-password');
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update volunteer status
export const updateVolunteerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status, isApproved: status === 'approved' },
      { new: true }
    ).select('-password');
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json(volunteolunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update volunteer location coverage
export const updateLocationCoverage = async (req, res) => {
  try {
    const { coveredAreas, currentLocation } = req.body;
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { location: { coveredAreas, currentLocation } },
      { new: true }
    ).select('-password');
    
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get volunteers by location
export const getVolunteersByLocation = async (req, res) => {
  try {
    const { area } = req.params;
    const volunteers = await Volunteer.find({
      'location.coveredAreas.name': { $regex: area, $options: 'i' },
      status: 'approved',
      isApproved: true
    }).select('-password');
    
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete volunteer
export const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create notification for volunteers in area
export const createLocationBasedNotification = async (reportData) => {
  try {
    const { location, type, title, message, reportId, reportModel } = reportData;
    
    // Find volunteers who cover this area
    const volunteers = await Volunteer.find({
      'location.coveredAreas.name': { $regex: location.area, $options: 'i' },
      status: 'approved',
      isApproved: true
    });

    // Create notifications for each volunteer
    const notifications = volunteers.map(volunteer => ({
      title,
      message,
      type,
      recipient: volunteer._id,
      relatedReport: reportId,
      reportModel,
      location: {
        area: location.area,
        coordinates: location.coordinates
      }
    }));

    await Notification.insertMany(notifications);
    
    return notifications.length;
  } catch (error) {
    console.error('Error creating notifications:', error);
    throw error;
  }
};

// Get volunteer notifications
export const getVolunteerNotifications = async (req, res) => {
  try {
    const volunteerId = req.params.id;
    const notifications = await Notification.find({ recipient: volunteerId })
      .populate('relatedReport')
      .sort({ createdAt: -1 });
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
