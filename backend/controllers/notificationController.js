const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
  try {
    const { title, message, targetBranch, targetAgeGroup, type, priority } = req.body;
    const notification = new Notification({
      title,
      message,
      targetBranch,
      targetAgeGroup: targetAgeGroup || 'all',
      type: type || 'info',
      priority: priority || 'normal'
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { branch, ageGroup } = req.params;
    const notifications = await Notification.find({
      targetBranch: branch,
      $or: [
        { targetAgeGroup: 'all' },
        { targetAgeGroup: ageGroup }
      ]
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch notifications.' });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch notifications.' });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete notification.' });
  }
};
