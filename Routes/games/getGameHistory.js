const express = require('express');
const router = express.Router();
const getGameHistoryController = require('../controllers/getGameHistory'); // Import the corresponding controller

// Define the route for getting game history and moves
router.get('/:gameId/history', getGameHistoryController.getGameHistory);

module.exports = router;
