const express = require('express');
const router = express.Router();
const { createNotification, getNotifications, getAllNotifications, deleteNotification } = require('../controllers/notificationController');

// Notification routes
router.post('/', createNotification);
router.get('/all', getAllNotifications);
router.get('/:branch/:ageGroup', getNotifications);
router.delete('/:id', deleteNotification);

module.exports = router;
