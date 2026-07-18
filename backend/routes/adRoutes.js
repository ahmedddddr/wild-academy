const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for ad image uploads
const uploadDir = path.join(__dirname, '../uploads/ads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// GET all ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find({ isActive: true }).sort({ order: 1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all ads (including inactive for admin)
router.get('/all', async (req, res) => {
  try {
    const ads = await Ad.find().sort({ order: 1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single ad
router.get('/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new ad with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, link, isActive, order } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const ad = new Ad({
      title,
      description,
      image: `/uploads/ads/${req.file.filename}`,
      link: link || '',
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0
    });

    const savedAd = await ad.save();
    res.status(201).json(savedAd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update ad
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, link, isActive, order } = req.body;
    
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // If new image uploaded, delete old image
    if (req.file) {
      if (ad.image && ad.image.startsWith('/uploads/ads/')) {
        const oldImagePath = path.join(__dirname, '..', ad.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      ad.image = `/uploads/ads/${req.file.filename}`;
    }

    if (title !== undefined) ad.title = title;
    if (description !== undefined) ad.description = description;
    if (link !== undefined) ad.link = link;
    if (isActive !== undefined) ad.isActive = isActive;
    if (order !== undefined) ad.order = order;

    const updatedAd = await ad.save();
    res.json(updatedAd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE ad
router.delete('/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // Delete image file
    if (ad.image && ad.image.startsWith('/uploads/ads/')) {
      const imagePath = path.join(__dirname, '..', ad.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Ad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
