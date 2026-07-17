const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  ageGroup: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  icon: {
    type: String,
    default: '🏆'
  },
  badgePhoto: {
    type: String
  },
  points: {
    type: Number,
    default: 0
  },
  dateEarned: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Achievement', achievementSchema);
