const Achievement = require('../models/Achievement');
const Badge = require('../models/Badge');
const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

// Create a new achievement for a user
exports.createAchievement = async (req, res) => {
  try {
    const { username, branch, ageGroup, title, description, badgePhoto, points } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newAchievement = new Achievement({
      username,
      branch,
      ageGroup,
      title,
      description,
      badgePhoto,
      points
    });

    await newAchievement.save();

    // Update user's points in leaderboard
    let leaderboardEntry = await Leaderboard.findOne({ username, branch, ageGroup });
    if (leaderboardEntry) {
      leaderboardEntry.points += points || 0;
      leaderboardEntry.updatedAt = Date.now();
      await leaderboardEntry.save();
    } else {
      leaderboardEntry = new Leaderboard({
        username,
        branch,
        ageGroup,
        points: points || 0
      });
      await leaderboardEntry.save();
    }

    // Update user's points in User model
    user.points += points || 0;
    await user.save();

    res.status(201).json({ message: 'Achievement created successfully', achievement: newAchievement });
  } catch (err) {
    res.status(500).json({ error: 'Error creating achievement' });
  }
};

// Get all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ dateEarned: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching achievements' });
  }
};

// Get achievements by username
exports.getAchievementsByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const achievements = await Achievement.find({ username }).sort({ dateEarned: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user achievements' });
  }
};

// Get achievements by branch and age group
exports.getAchievementsByFilter = async (req, res) => {
  try {
    const { branch, ageGroup } = req.query;
    const filter = {};
    if (branch) filter.branch = branch;
    if (ageGroup) filter.ageGroup = ageGroup;

    const achievements = await Achievement.find(filter).sort({ dateEarned: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching filtered achievements' });
  }
};

// Assign a badge to a user (creates an achievement)
exports.assignBadgeToUser = async (req, res) => {
  try {
    const { username, branch, ageGroup, badgeId } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get badge details
    const badge = await Badge.findById(badgeId);
    if (!badge) {
      return res.status(404).json({ error: 'Badge not found' });
    }

    // Create achievement with badge
    const newAchievement = new Achievement({
      username,
      branch,
      ageGroup,
      title: badge.name,
      description: badge.description,
      icon: badge.animal,
      badgePhoto: badge.badgePhoto,
      points: badge.points
    });

    await newAchievement.save();

    // Update user's points in leaderboard
    let leaderboardEntry = await Leaderboard.findOne({ username, branch, ageGroup });
    if (leaderboardEntry) {
      leaderboardEntry.points += badge.points;
      leaderboardEntry.updatedAt = Date.now();
      await leaderboardEntry.save();
    } else {
      leaderboardEntry = new Leaderboard({
        username,
        branch,
        ageGroup,
        points: badge.points
      });
      await leaderboardEntry.save();
    }

    // Update user's points in User model
    user.points += badge.points;
    await user.save();

    res.status(201).json({ message: 'Badge assigned successfully', achievement: newAchievement });
  } catch (err) {
    res.status(500).json({ error: 'Error assigning badge' });
  }
};

// Update an achievement
exports.updateAchievement = async (req, res) => {
  try {
    const { title, description, badgePhoto, points } = req.body;

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { title, description, badgePhoto, points },
      { new: true, runValidators: true }
    );

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    res.json({ message: 'Achievement updated successfully', achievement });
  } catch (err) {
    res.status(500).json({ error: 'Error updating achievement' });
  }
};

// Delete an achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.json({ message: 'Achievement deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting achievement' });
  }
};

// Get user's total points
exports.getUserTotalPoints = async (req, res) => {
  try {
    const { username } = req.params;
    const achievements = await Achievement.find({ username });
    const totalPoints = achievements.reduce((sum, ach) => sum + (ach.points || 0), 0);
    res.json({ username, totalPoints, achievementCount: achievements.length });
  } catch (err) {
    res.status(500).json({ error: 'Error calculating user points' });
  }
};
