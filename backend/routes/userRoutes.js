const express = require('express');
const router = express.Router();
const { createUser, getUsers, deleteUser, deleteAllUsers, loginUser } = require('../controllers/userController');

// User routes
router.post('/', createUser);
router.get('/', getUsers);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);
router.delete('/all', deleteAllUsers);

module.exports = router;
