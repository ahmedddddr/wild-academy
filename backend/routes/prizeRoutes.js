const express = require('express');
const router = express.Router();
const {
  createPrize,
  getAllPrizes,
  getAllPrizesAdmin,
  getPrizeById,
  updatePrize,
  deletePrize,
  purchasePrize,
  getUserPurchases
} = require('../controllers/prizeController');

// Create a new prize (admin)
router.post('/', createPrize);

// Get all active prizes
router.get('/', getAllPrizes);

// Get all prizes (admin)
router.get('/admin/all', getAllPrizesAdmin);

// Get user's purchase history
router.get('/purchases/:username', getUserPurchases);

// Purchase a prize
router.post('/purchase', purchasePrize);

// Get a single prize by ID
router.get('/:id', getPrizeById);

// Update a prize (admin)
router.put('/:id', updatePrize);

// Delete a prize (admin)
router.delete('/:id', deletePrize);

module.exports = router;
