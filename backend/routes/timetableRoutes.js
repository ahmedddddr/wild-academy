const express = require('express');
const router = express.Router();
const { createSession, getTimetable, getAllTimetables, deleteSession, deleteBranchTimetable, updateSession } = require('../controllers/timetableController');

// Timetable routes
router.post('/', createSession);
router.get('/all', getAllTimetables);
router.get('/:branch/:ageGroup', getTimetable);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);
router.delete('/branch/:branch/:ageGroup', deleteBranchTimetable);

module.exports = router;
