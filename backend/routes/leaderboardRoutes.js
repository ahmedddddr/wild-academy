const express = require('express');
const router = express.Router();
const {
  getAllLeaderboardEntries,
  getLeaderboardByFilter,
  createOrUpdateEntry,
  updatePoints,
  deleteEntry,
  recalculateRanks,
  getTopEntries
} = require('../controllers/leaderboardController');

// Get all leaderboard entries
router.get('/all', getAllLeaderboardEntries);

// Get leaderboard by branch and age group (legacy endpoint)
router.get('/:branch/:ageGroup', getLeaderboardByFilter);

// Get filtered leaderboard
router.get('/', getLeaderboardByFilter);

// Get top entries
router.get('/top', getTopEntries);

// Add or update leaderboard entry
router.post('/', createOrUpdateEntry);

// Update points for a user
router.put('/:id', updatePoints);

// Recalculate ranks
router.post('/recalculate', recalculateRanks);

// Delete a leaderboard entry
router.delete('/:id', deleteEntry);

// Reset leaderboard for a branch/age group (legacy endpoint)
router.delete('/:branch/:ageGroup', async (req, res) => {
  try {
    const { branch, ageGroup } = req.params;
    const Leaderboard = require('../models/Leaderboard');
    await Leaderboard.deleteMany({ branch, ageGroup });
    res.status(200).json({ message: 'Leaderboard reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset leaderboard', error: error.message });
  }
});

module.exports = router;
