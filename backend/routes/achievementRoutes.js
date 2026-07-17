const express = require('express');
const router = express.Router();
const {
  createAchievement,
  getAllAchievements,
  getAchievementsByUsername,
  getAchievementsByFilter,
  assignBadgeToUser,
  updateAchievement,
  deleteAchievement,
  getUserTotalPoints
} = require('../controllers/achievementController');

// Get all achievements
router.get('/all', getAllAchievements);

// Get achievements by username
router.get('/user/:username', getAchievementsByUsername);

// Get achievements by branch and age group (legacy endpoint)
router.get('/:branch/:ageGroup', getAchievementsByFilter);

// Get filtered achievements
router.get('/', getAchievementsByFilter);

// Get user's total points
router.get('/points/:username', getUserTotalPoints);

// Add a new achievement
router.post('/', createAchievement);

// Assign a badge to a user
router.post('/assign-badge', assignBadgeToUser);

// Update an achievement
router.put('/:id', updateAchievement);

// Delete an achievement
router.delete('/:id', deleteAchievement);

module.exports = router;
