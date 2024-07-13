const Request = require('../models/Request');

exports.sendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  try {
    const newRequest = new Request({ sender: senderId, receiver: receiverId });
    await newRequest.save();
    res.json(newRequest);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.respondToRequest = async (req, res) => {
  const { status } = req.body;

  try {
    const request = await Request.findById(req.para);
    if (!request) return res.status(404).json({ msg: 'Request not found' });

    request.status = status;
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getRequests = async (req, res) => {
  const userId = req.user.id;

  try {
    const requests = await Request.find({ receiver: userId });
    res.json(requests);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
