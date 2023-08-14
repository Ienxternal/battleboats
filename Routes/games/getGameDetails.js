const express = require('express');
const router = express.Router();
const getGameDetailsController = require('../controllers/getGameDetails'); // Import the corresponding controller

// Define the route for getting details of a specific game
router.get('/:gameId', getGameDetailsController.getGameDetails);

module.exports = router;
