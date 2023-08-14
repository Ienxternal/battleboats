const express = require('express');
const router = express.Router();
const Game = require('../models/Game'); // Import the Game model

// GET route to fetch recent games
router.get('/recent', async (req, res) => {
  try {
    // Fetch the 10 most recent games from the database
    const recentGames = await Game.find().sort({ createdAt: -1 }).limit(10);
    res.json(recentGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add more routes and controllers as needed

module.exports = router;
