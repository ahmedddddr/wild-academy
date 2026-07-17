const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

// Get all leaderboard entries
exports.getAllLeaderboardEntries = async (req, res) => {
  try {
    const entries = await Leaderboard.find().sort({ points: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching leaderboard entries' });
  }
};

// Get leaderboard by branch and age group
exports.getLeaderboardByFilter = async (req, res) => {
  try {
    const { branch, ageGroup } = req.query;
    const filter = {};
    if (branch) filter.branch = branch;
    if (ageGroup) filter.ageGroup = ageGroup;

    const entries = await Leaderboard.find(filter).sort({ points: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching filtered leaderboard' });
  }
};

// Add or update a leaderboard entry
exports.createOrUpdateEntry = async (req, res) => {
  try {
    const { username, branch, ageGroup, points } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if entry already exists
    let entry = await Leaderboard.findOne({ username, branch, ageGroup });

    if (entry) {
      // Update existing entry
      entry.points = points;
      entry.updatedAt = Date.now();
      await entry.save();
      res.json({ message: 'Leaderboard entry updated successfully', entry });
    } else {
      // Create new entry
      entry = new Leaderboard({
        username,
        branch,
        ageGroup,
        points
      });
      await entry.save();
      res.status(201).json({ message: 'Leaderboard entry created successfully', entry });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error creating/updating leaderboard entry' });
  }
};

// Update points for a user
exports.updatePoints = async (req, res) => {
  try {
    const { points } = req.body;
    const entry = await Leaderboard.findByIdAndUpdate(
      req.params.id,
      { points, updatedAt: Date.now() },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }

    res.json({ message: 'Points updated successfully', entry });
  } catch (err) {
    res.status(500).json({ error: 'Error updating points' });
  }
};

// Delete a leaderboard entry
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json({ message: 'Leaderboard entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting leaderboard entry' });
  }
};

// Recalculate ranks
exports.recalculateRanks = async (req, res) => {
  try {
    const entries = await Leaderboard.find().sort({ points: -1 });
    
    for (let i = 0; i < entries.length; i++) {
      entries[i].rank = i + 1;
      await entries[i].save();
    }

    res.json({ message: 'Ranks recalculated successfully', entries });
  } catch (err) {
    res.status(500).json({ error: 'Error recalculating ranks' });
  }
};

// Get top N leaderboard entries
exports.getTopEntries = async (req, res) => {
  try {
    const { limit = 10, branch, ageGroup } = req.query;
    const filter = {};
    if (branch) filter.branch = branch;
    if (ageGroup) filter.ageGroup = ageGroup;

    const entries = await Leaderboard.find(filter)
      .sort({ points: -1 })
      .limit(parseInt(limit));

    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching top entries' });
  }
};
