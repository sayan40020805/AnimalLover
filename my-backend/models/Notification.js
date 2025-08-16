import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['rescue_request', 'approval', 'update', 'alert'],
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true
  },
  relatedReport: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'reportModel'
  },
  reportModel: {
    type: String,
    enum: ['LostAnimal', 'RescueAccident', 'RescueDead', 'Animal']
  },
  location: {
    area: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Notification', notificationSchema);
