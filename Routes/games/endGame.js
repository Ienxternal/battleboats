const express = require('express');
const router = express.Router();
const endGameController = require('../controllers/endGame'); // Import the corresponding controller

// Define the route for ending a game
router.post('/:gameId/end', endGameController.endGame);

module.exports = router;
