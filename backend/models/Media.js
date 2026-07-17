const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true
  },
  ageGroup: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Media', mediaSchema);
