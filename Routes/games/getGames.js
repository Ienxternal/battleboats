const express = require('express');
const router = express.Router();
const getGamesController = require('../controllers/getGames'); // Import the corresponding controller

// Define the route for getting a list of all games
router.get('/', getGamesController.getGames);

module.exports = router;
