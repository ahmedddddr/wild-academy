const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true
  },
  ageGroup: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index for efficient queries
timetableSchema.index({ branch: 1, ageGroup: 1 });

module.exports = mongoose.model('Timetable', timetableSchema);
