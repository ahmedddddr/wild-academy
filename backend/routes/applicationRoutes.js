const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Create a new application
router.post('/apply', async (req, res) => {
  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('❌ Error saving application:', error);
    res.status(500).json({ message: 'Failed to save application', error: error.message });
  }
});

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error('❌ Error fetching applications:', err);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// Delete one application by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Application.findByIdAndDelete(id);
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete application', error });
  }
});

// Delete all applications
router.delete('/clear/all', async (req, res) => {
  try {
    await Application.deleteMany({});
    res.status(200).json({ message: 'All applications deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete applications', error });
  }
});

module.exports = router;
