const Prize = require('../models/Prize');
const User = require('../models/User');

// Create a new prize (admin only)
exports.createPrize = async (req, res) => {
  try {
    const { name, description, image, points, stock, category, isActive } = req.body;

    const newPrize = new Prize({
      name,
      description,
      image,
      points,
      stock,
      category,
      isActive
    });

    await newPrize.save();
    res.status(201).json({ message: 'Prize created successfully', prize: newPrize });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Prize name already exists' });
    }
    res.status(500).json({ error: 'Error creating prize' });
  }
};

// Get all active prizes
exports.getAllPrizes = async (req, res) => {
  try {
    const prizes = await Prize.find({ isActive: true }).sort({ category: 1, points: 1 });
    res.json(prizes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching prizes' });
  }
};

// Get all prizes (including inactive - admin only)
exports.getAllPrizesAdmin = async (req, res) => {
  try {
    const prizes = await Prize.find().sort({ category: 1, points: 1 });
    res.json(prizes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching prizes' });
  }
};

// Get a single prize by ID
exports.getPrizeById = async (req, res) => {
  try {
    const prize = await Prize.findById(req.params.id);
    if (!prize) {
      return res.status(404).json({ error: 'Prize not found' });
    }
    res.json(prize);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching prize' });
  }
};

// Update a prize (admin only)
exports.updatePrize = async (req, res) => {
  try {
    const { name, description, image, points, stock, category, isActive } = req.body;

    const prize = await Prize.findByIdAndUpdate(
      req.params.id,
      { name, description, image, points, stock, category, isActive },
      { new: true, runValidators: true }
    );

    if (!prize) {
      return res.status(404).json({ error: 'Prize not found' });
    }

    res.json({ message: 'Prize updated successfully', prize });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Prize name already exists' });
    }
    res.status(500).json({ error: 'Error updating prize' });
  }
};

// Delete a prize (admin only)
exports.deletePrize = async (req, res) => {
  try {
    const prize = await Prize.findByIdAndDelete(req.params.id);
    if (!prize) {
      return res.status(404).json({ error: 'Prize not found' });
    }
    res.json({ message: 'Prize deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting prize' });
  }
};

// Purchase a prize
exports.purchasePrize = async (req, res) => {
  try {
    const { username, prizeId } = req.body;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the prize
    const prize = await Prize.findById(prizeId);
    if (!prize) {
      return res.status(404).json({ error: 'Prize not found' });
    }

    // Check if prize is active
    if (!prize.isActive) {
      return res.status(400).json({ error: 'Prize is not available' });
    }

    // Check if prize is in stock
    if (prize.stock <= 0) {
      return res.status(400).json({ error: 'Prize is out of stock' });
    }

    // Check if user has enough points
    const userPoints = user.points || 0;
    if (userPoints < prize.points) {
      return res.status(400).json({ error: 'Not enough points' });
    }

    // Deduct points from user
    user.points = userPoints - prize.points;
    
    // Add purchase to user's purchase history
    if (!user.purchases) {
      user.purchases = [];
    }
    user.purchases.push({
      prizeId: prize._id,
      prizeName: prize.name,
      points: prize.points,
      purchaseDate: new Date()
    });

    await user.save();

    // Decrease prize stock
    prize.stock = prize.stock - 1;
    await prize.save();

    res.json({ 
      message: 'Prize purchased successfully', 
      remainingPoints: user.points,
      prize: prize.name
    });
  } catch (err) {
    console.error('Error purchasing prize:', err);
    res.status(500).json({ error: 'Error purchasing prize' });
  }
};

// Get user's purchase history
exports.getUserPurchases = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.purchases || []);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching purchase history' });
  }
};
