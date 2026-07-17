const express = require('express');
const router = express.Router();
const { createMessage, getMessages, getAllUsers } = require('../controllers/messageController');

// Chat routes
router.post('/chat', createMessage);
router.get('/chat/:username', getMessages);
router.get('/users', getAllUsers);

module.exports = router;
