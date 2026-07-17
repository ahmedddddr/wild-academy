const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  targetBranch: {
    type: String,
    required: true
  },
  targetAgeGroup: {
    type: String,
    required: true,
    default: 'all'
  },
  type: {
    type: String,
    enum: ['info', 'event', 'alert', 'achievement'],
    default: 'info'
  },
  priority: {
    type: String,
    enum: ['normal', 'urgent'],
    default: 'normal'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
