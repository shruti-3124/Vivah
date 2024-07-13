const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;

  try {
    const newMessage = new Message({ sender: senderId, receiver: receiverId, content });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getMessages = async (req, res) => {
  const userId = req.user.id;
  const { contactId } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
