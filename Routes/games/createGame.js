const express = require('express');
const router = express.Router();
const createGameController = require('../controllers/createGame'); // Import the corresponding controller

// Define the route for creating a new game
router.post('/', createGameController.createGame);

module.exports = router;
