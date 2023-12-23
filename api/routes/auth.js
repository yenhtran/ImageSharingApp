const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    // Check if email already exists
    const checkUserEmail = await User.findOne({
      email: req.body.email,
    });

    if (checkUserEmail) {
      return res.status(400).json('Email already exists');
    }

    // Check if username already exists
    const checkUsername = await User.findOne({
      username: req.body.username,
    });

    if (checkUsername) {
      return res.status(400).json('Username already exists');
    }

    // Create and save user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json('Invalid email');
    }

    const userPassword = await User.findOne({
      password: req.body.password,
    });

    if (!userPassword) {
      return res.status(400).json('Invalid password');
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
