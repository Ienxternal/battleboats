// routes/signup.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import the User model

const router = express.Router();

// User registration (signup) route
router.post('/Signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exist
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
