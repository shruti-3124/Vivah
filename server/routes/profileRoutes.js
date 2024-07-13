const express = require('express');
const { createProfile, updateProfile, getAllProfiles, getProfileById } = require('../controllers/profileController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/',auth, createProfile);
router.put('/:id', auth, updateProfile);
router.get('/', auth, getAllProfiles);
router.get('/:id', auth, getProfileById);

module.exports = router;
