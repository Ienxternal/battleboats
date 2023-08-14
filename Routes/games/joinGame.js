const express = require('express');
const router = express.Router();
const joinGameController = require('../controllers/joinGame'); // Import the corresponding controller

// Define the route for joining a game
router.post('/:gameId/join', joinGameController.joinGame);

module.exports = router;
