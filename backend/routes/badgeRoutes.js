const express = require('express');
const router = express.Router();
const {
  createBadge,
  getAllBadges,
  getBadgeById,
  updateBadge,
  deleteBadge,
  getBadgesByRarity
} = require('../controllers/badgeController');

// Create a new badge
router.post('/', createBadge);

// Get all badges
router.get('/', getAllBadges);

// Get badges by rarity
router.get('/rarity/:rarity', getBadgesByRarity);

// Get a single badge by ID
router.get('/:id', getBadgeById);

// Update a badge
router.put('/:id', updateBadge);

// Delete a badge
router.delete('/:id', deleteBadge);

module.exports = router;
