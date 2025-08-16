import RescueAccident from '../models/RescueAccident.js';
import RescueDead from '../models/RescueDead.js';
import LostAnimal from '../models/LostAnimal.js';
import Volunteer from '../models/Volunteer.js';
import Notification from '../models/Notification.js';

// ------------------ ACCIDENT REPORT ------------------
export const reportAccident = async (req, res) => {
  try {
    const {
      animalType,
      location,
      description,
      reporterName,
      reporterPhone,
    } = req.body;

    if (
      !animalType ||
      !location ||
      !description ||
      !reporterName ||
      !reporterPhone
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find volunteer who covers this location
    const availableVolunteers = await Volunteer.find({
      isApproved: true,
      coveredLocations: { $in: [location] }
    });

    let assignedVolunteer = null;
    if (availableVolunteers.length > 0) {
      assignedVolunteer = availableVolunteers[0]._id;
    }

    const newReport = new RescueAccident({
      animalType,
      location,
      description,
      reporterName,
      reporterPhone,
      image: req.file ? req.file.path : null,
      reportedBy: req.user.id,
      assignedVolunteer,
    });

    await newReport.save();

    // Create notification for assigned volunteer
    if (assignedVolunteer) {
      const notification = new Notification({
        recipient: assignedVolunteer,
        sender: req.user.id,
        type: 'new_report',
        message: `New rescue accident report in ${location}`,
        relatedReport: newReport._id,
        reportType: 'rescue-accident'
      });
      await notification.save();
    }

    res.status(201).json({ 
      message: 'Accident reported successfully', 
      data: newReport,
      assignedTo: assignedVolunteer ? availableVolunteers[0].name : 'No volunteer available for this location'
    });
  } catch (error) {
    console.error('❌ Accident Report Error:', error);
    res.status(500).json({ message: 'Server error while reporting accident' });
  }
};

// ------------------ DEAD ANIMAL REPORT ------------------
export const reportDeadAnimal = async (req, res) => {
  try {
    const {
      animalType,
      location,
      description,
      reporterName,
      reporterPhone,
    } = req.body;

    if (
      !animalType ||
      !location ||
      !description ||
      !reporterName ||
      !reporterPhone
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find volunteer who covers this location
    const availableVolunteers = await Volunteer.find({
      isApproved: true,
      coveredLocations: { $in: [location] }
    });

    let assignedVolunteer = null;
    if (availableVolunteers.length > 0) {
      assignedVolunteer = availableVolunteers[0]._id;
    }

    const report = new RescueDead({
      animalType,
      location,
      description,
      reporterName,
      reporterPhone,
      image: req.file ? req.file.path : null,
      reportedBy: req.user.id,
      assignedVolunteer,
    });

    await report.save();

    // Create notification for assigned volunteer
    if (assignedVolunteer) {
      const notification = new Notification({
        recipient: assignedVolunteer,
        sender: req.user.id,
        type: 'new_report',
        message: `New dead animal report in ${location}`,
        relatedReport: report._id,
        reportType: 'rescue-dead'
      });
      await notification.save();
    }

    res.status(201).json({ 
      message: 'Dead animal reported successfully', 
      data: report,
      assignedTo: assignedVolunteer ? availableVolunteers[0].name : 'No volunteer available for this location'
    });
  } catch (error) {
    console.error('❌ Dead Animal Report Error:', error);
    res.status(500).json({ message: 'Server error while reporting dead animal' });
  }
};

// ------------------ LOST ANIMAL REPORT ------------------
export const reportLostAnimal = async (req, res) => {
  try {
    const { animalType, location, description, contactInfo } = req.body;

    if (!animalType || !location || !description || !contactInfo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find volunteer who covers this location
    const availableVolunteers = await Volunteer.find({
      isApproved: true,
      coveredLocations: { $in: [location] }
    });

    let assignedVolunteer = null;
    if (availableVolunteers.length > 0) {
      assignedVolunteer = availableVolunteers[0]._id;
    }

    const newLost = new LostAnimal({
      animalType,
      location,
      description,
      contactInfo,
      image: req.file ? req.file.path : null,
      reportedBy: req.user.id,
      assignedVolunteer,
    });

    await newLost.save();

    // Create notification for assigned volunteer
    if (assignedVolunteer) {
      const notification = new Notification({
        recipient: assignedVolunteer,
        sender: req.user.id,
        type: 'new_report',
        message: `New lost animal report in ${location}`,
        relatedReport: newLost._id,
        reportType: 'lost-animal'
      });
      await notification.save();
    }

    res.status(201).json({ 
      message: 'Lost animal reported successfully', 
      data: newLost,
      assignedTo: assignedVolunteer ? availableVolunteers[0].name : 'No volunteer available for this location'
    });
  } catch (error) {
    console.error('❌ Lost Animal Report Error:', error);
    res.status(500).json({ message: 'Server error while reporting lost animal' });
  }
};

// ------------------ GET ALL ACCIDENT REPORTS ------------------
export const getAllAccidents = async (req, res) => {
  try {
    const accidents = await RescueAccident.find()
      .populate('reportedBy', 'name email')
      .populate('assignedVolunteer', 'name phone')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      message: 'Accident reports retrieved successfully',
      data: accidents,
      count: accidents.length
    });
  } catch (error) {
    console.error('❌ Get All Accidents Error:', error);
    res.status(500).json({ message: 'Server error while retrieving accident reports' });
  }
};

// ------------------ GET ALL DEAD ANIMAL REPORTS ------------------
export const getAllDeadAnimals = async (req, res) => {
  try {
    const deadAnimals = await RescueDead.find()
      .populate('reportedBy', 'name email')
      .populate('assignedVolunteer', 'name phone')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      message: 'Dead animal reports retrieved successfully',
      data: deadAnimals,
      count: deadAnimals.length
    });
  } catch (error) {
    console.error('❌ Get All Dead Animals Error:', error);
    res.status(500).json({ message: 'Server error while retrieving dead animal reports' });
  }
};

// ------------------ GET ALL LOST ANIMAL REPORTS ------------------
export const getAllLostAnimals = async (req, res) => {
  try {
    const lostAnimals = await LostAnimal.find()
      .populate('reportedBy', 'name email')
      .populate('assignedVolunteer', 'name phone')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      message: 'Lost animal reports retrieved successfully',
      data: lostAnimals,
      count: lostAnimals.length
    });
  } catch (error) {
    console.error('❌ Get All Lost Animals Error:', error);
    res.status(500).json({ message: 'Server error while retrieving lost animal reports' });
  }
};
