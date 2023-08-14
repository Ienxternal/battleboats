const express = require('express');
const router = express.Router();
const startGameController = require('../controllers/startGame'); // Import the corresponding controller

// Define the route for starting a game
router.post('/:gameId/start', startGameController.startGame);

module.exports = router;
