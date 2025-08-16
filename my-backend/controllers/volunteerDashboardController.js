import RescueAccident from "../models/RescueAccident.js";
import RescueDead from "../models/RescueDead.js";
import LostAnimal from "../models/LostAnimal.js";

// Get all reports for volunteer dashboard
export const getAllReports = async (req, res) => {
  try {
    const [accidents, deadAnimals, lostAnimals] = await Promise.all([
      RescueAccident.find().populate('reportedBy', 'name email phone'),
      RescueDead.find().populate('reportedBy', 'name email phone'),
      LostAnimal.find().populate('reportedBy', 'name email phone')
    ]);

    // Combine all reports with type information
    const allReports = [
      ...accidents.map(report => ({
        _id: report._id,
        type: 'Rescue Accident',
        animalType: report.animalType,
        description: report.description,
        location: report.location,
        image: report.image,
        status: report.status,
        reportedBy: report.reportedBy,
        createdAt: report.createdAt
      })),
      ...deadAnimals.map(report => ({
        _id: report._id,
        type: 'Rescue Dead',
        animalType: report.animalType,
        description: report.description,
        location: report.location,
        image: report.image,
        status: report.status,
        reportedBy: report.reportedBy,
        createdAt: report.createdAt
      })),
      ...lostAnimals.map(report => ({
        _id: report._id,
        type: 'Lost Animal',
        animalType: report.animalType || report.breed,
        description: report.description,
        location: report.location,
        image: report.image,
        status: report.status,
        reportedBy: report.reportedBy,
        createdAt: report.createdAt
      }))
    ];

    // Sort by newest first
    allReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      reports: allReports,
      total: allReports.length
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reports',
      error: error.message
    });
  }
};

// Get report details by ID
export const getReportDetails = async (req, res) => {
  try {
    const { id, type } = req.params;
    let report;

    switch (type) {
      case 'rescue-accident':
        report = await RescueAccident.findById(id).populate('reportedBy', 'name email phone');
        break;
      case 'rescue-dead':
        report = await RescueDead.findById(id).populate('reportedBy', 'name email phone');
        break;
      case 'lost-animal':
        report = await LostAnimal.findById(id).populate('reportedBy', 'name email phone');
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Error fetching report details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching report details',
      error: error.message
    });
  }
};

// Update report status
export const updateReportStatus = async (req, res) => {
  try {
    const { id, type } = req.params;
    const { status } = req.body;

    let Model;
    switch (type) {
      case 'rescue-accident':
        Model = RescueAccident;
        break;
      case 'rescue-dead':
        Model = RescueDead;
        break;
      case 'lost-animal':
        Model = LostAnimal;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    const report = await Model.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('reportedBy', 'name email phone');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      report,
      message: 'Report status updated successfully'
    });
  } catch (error) {
    console.error('Error updating report status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating report status',
      error: error.message
    });
  }
};
