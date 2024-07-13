const express = require('express');
const { sendRequest, respondToRequest, getRequests } = require('../controllers/requestController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/send', auth, sendRequest);
router.put('/:id', auth, respondToRequest);
router.get('/', auth, getRequests);

module.exports = router;
