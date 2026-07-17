const Badge = require('../models/Badge');
const Achievement = require('../models/Achievement');
const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

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
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json({ error: 'Badge not found' });
    }

    // Find all achievements associated with this badge (by title matching badge name)
    const achievements = await Achievement.find({ title: badge.name });

    // For each achievement, subtract points from leaderboard and user
    for (const achievement of achievements) {
      // Update leaderboard
      const leaderboardEntry = await Leaderboard.findOne({
        username: achievement.username,
        branch: achievement.branch,
        ageGroup: achievement.ageGroup
      });

      if (leaderboardEntry) {
        leaderboardEntry.points -= achievement.points || 0;
        if (leaderboardEntry.points < 0) leaderboardEntry.points = 0;
        await leaderboardEntry.save();
      }

      // Update user points
      const user = await User.findOne({ username: achievement.username });
      if (user) {
        user.points -= achievement.points || 0;
        if (user.points < 0) user.points = 0;
        await user.save();
      }
    }

    // Delete all achievements associated with this badge
    await Achievement.deleteMany({ title: badge.name });

    // Delete the badge
    await Badge.findByIdAndDelete(req.params.id);

    res.json({ message: 'Badge deleted successfully', affectedAchievements: achievements.length });
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
