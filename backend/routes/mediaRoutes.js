const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

// Add a media photo
router.post('/', async (req, res) => {
  try {
    const { branch, ageGroup, photoUrl } = req.body;
    const newMedia = new Media({ branch, ageGroup, photoUrl });
    await newMedia.save();
    res.status(200).json({ message: 'Media added successfully', media: newMedia });
  } catch (error) {
    console.error('❌ Error adding media:', error);
    res.status(500).json({ message: 'Failed to add media', error: error.message });
  }
});

// Get all media
router.get('/', async (req, res) => {
  try {
    const media = await Media.find().sort({ uploadedAt: -1 });
    res.json(media);
  } catch (error) {
    console.error('❌ Error fetching media:', error);
    res.status(500).json({ message: 'Failed to fetch media', error: error.message });
  }
});

// Get photos by branch and age group
router.get('/:branch/:ageGroup', async (req, res) => {
  try {
    const { branch, ageGroup } = req.params;
    const photos = await Media.find({ branch, ageGroup }).sort({ uploadedAt: -1 });
    const photoUrls = photos.map(photo => photo.photoUrl);
    res.json(photoUrls);
  } catch (error) {
    console.error('❌ Error fetching media:', error);
    res.status(500).json({ message: 'Failed to fetch media', error: error.message });
  }
});

// Delete a photo by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Media.findByIdAndDelete(id);
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete media', error: error.message });
  }
});

module.exports = router;
