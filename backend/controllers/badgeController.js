const Badge = require('../models/Badge');

// Create a new badge
exports.createBadge = async (req, res) => {
  try {
    const { name, description, animal, badgePhoto, points, rarity } = req.body;

    const newBadge = new Badge({
      name,
      description,
      animal,
      badgePhoto,
      points,
      rarity
    });

    await newBadge.save();
    res.status(201).json({ message: 'Badge created successfully', badge: newBadge });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Badge name already exists' });
    }
    res.status(500).json({ error: 'Error creating badge' });
  }
};

// Get all badges
exports.getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find().sort({ rarity: 1, name: 1 });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching badges' });
  }
};

// Get a single badge by ID
exports.getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json({ error: 'Badge not found' });
    }
    res.json(badge);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching badge' });
  }
};

// Update a badge
exports.updateBadge = async (req, res) => {
  try {
    const { name, description, animal, badgePhoto, points, rarity } = req.body;

    const badge = await Badge.findByIdAndUpdate(
      req.params.id,
      { name, description, animal, badgePhoto, points, rarity },
      { new: true, runValidators: true }
    );

    if (!badge) {
      return res.status(404).json({ error: 'Badge not found' });
    }

    res.json({ message: 'Badge updated successfully', badge });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Badge name already exists' });
    }
    res.status(500).json({ error: 'Error updating badge' });
  }
};

// Delete a badge
exports.deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) {
      return res.status(404).json({ error: 'Badge not found' });
    }
    res.json({ message: 'Badge deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting badge' });
  }
};

// Get badges by rarity
exports.getBadgesByRarity = async (req, res) => {
  try {
    const { rarity } = req.params;
    const badges = await Badge.find({ rarity }).sort({ name: 1 });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching badges by rarity' });
  }
};
