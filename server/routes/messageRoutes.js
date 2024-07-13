const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, sendMessage);
router.get('/', auth, getMessages);

module.exports = router;
