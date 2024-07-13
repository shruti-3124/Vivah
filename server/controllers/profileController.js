const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
  const {
    fullName,
    dob,
    maritalStatus,
    gender,
    caste,
    height,
    color,
    religion,
    location,
    bio,
  } = req.body;

  try {
    const newProfile = new Profile({
      user: req.user.id,
      fullName,
      dob,
      maritalStatus,
      gender,
      caste,
      height,
      color,
      religion,
      location,
      bio,
    });

    const profile = await newProfile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: Profile creation failed');
  }
};

exports.updateProfile = async (req, res) => {
  const {
    fullName,
    dob,
    maritalStatus,
    gender,
    caste,
    height,
    color,
    religion,
    location,
    bio,
  } = req.body;

  const profileFields = {
    fullName,
    dob,
    maritalStatus,
    gender,
    caste,
    height,
    color,
    religion,
    location,
    bio,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAllProfiles = async (req, res) => {
  const userGender = req.user.gender;
  const targetGender = userGender === 'male' ? 'female' : 'male';

  const { minAge, maxAge, location } = req.query;
  let filters = { gender: targetGender };

  if (minAge) filters.age = { $gte: minAge };
  if (maxAge) filters.age = { ...filters.age, $lte: maxAge };
  if (location) filters.location = location;

  try {
    const profiles = await Profile.find(filters);
    res.json(profiles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
