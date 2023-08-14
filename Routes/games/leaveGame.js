const express = require('express');
const router = express.Router();
const leaveGameController = require('../controllers/leaveGame'); // Import the corresponding controller

// Define the route for leaving a game
router.post('/:gameId/leave', leaveGameController.leaveGame);

module.exports = router;
