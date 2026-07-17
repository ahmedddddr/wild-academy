const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  try {
    const { username, sender, text } = req.body;
    const message = new Message({ username, sender, text });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { username } = req.params;
    const messages = await Message.find({ username }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch messages.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Message.distinct('username');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch users.' });
  }
};
