const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
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
  points: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
