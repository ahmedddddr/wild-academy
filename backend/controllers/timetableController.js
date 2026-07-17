const Timetable = require('../models/Timetable');

exports.createSession = async (req, res) => {
  try {
    const { branch, ageGroup, day, time, activity } = req.body;
    const session = new Timetable({
      branch,
      ageGroup,
      day,
      time,
      activity
    });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

exports.getTimetable = async (req, res) => {
  try {
    const { branch, ageGroup } = req.params;
    const timetable = await Timetable.find({ branch, ageGroup }).sort({ day: 1, time: 1 });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch timetable.' });
  }
};

exports.getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find().sort({ branch: 1, ageGroup: 1, day: 1, time: 1 });
    res.json(timetables);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch timetables.' });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    await Timetable.findByIdAndDelete(id);
    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete session.' });
  }
};

exports.deleteBranchTimetable = async (req, res) => {
  try {
    const { branch, ageGroup } = req.params;
    await Timetable.deleteMany({ branch, ageGroup });
    res.json({ message: 'Branch timetable deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete branch timetable.' });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { time, activity } = req.body;
    
    const session = await Timetable.findByIdAndUpdate(
      id,
      { time, activity },
      { new: true }
    );
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: 'Unable to update session.' });
  }
};
