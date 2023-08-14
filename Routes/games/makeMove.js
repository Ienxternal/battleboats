const express = require('express');
const router = express.Router();
const makeMoveController = require('../controllers/makeMove'); // Import the corresponding controller

// Define the route for making a move in a game
router.post('/:gameId/move', makeMoveController.makeMove);

module.exports = router;
