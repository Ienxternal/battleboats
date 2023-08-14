const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT library
const User = require('../../models/User');
const { authenticateUser } = require('../../middleware/authenticateUser'); // Import the authenticateUser middleware

const router = express.Router();

// User registration (signup) route
router.post('/signup', async (req, res) => {
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

// User login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token and send it in the response
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Protected routes
router.get('/lobby', authenticateUser, (req, res) => {
    res.json({ message: 'Welcome to the lobby' });
});

router.post('/create-game', authenticateUser, (req, res) => {
    // Handle creating a new game
});

router.get('/game', authenticateUser, (req, res) => {
    // Handle getting game details
});

router.post('/game/:id', authenticateUser, (req, res) => {
    // Handle making a move in the game
});

router.post('/logout', authenticateUser, (req, res) => {
    // Handle user logout
});

module.exports = router;
