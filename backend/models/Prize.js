const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    default: ''
  },
  points: {
    type: Number,
    required: true,
    default: 100
  },
  stock: {
    type: Number,
    required: true,
    default: 10
  },
  category: {
    type: String,
    enum: ['toys', 'books', 'clothing', 'accessories', 'other'],
    default: 'other'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prize', prizeSchema);
