const express = require('express');
const router = express.Router();
const getUserStatisticsController = require('../controllers/getUserStatistics');

// Define routes for user statistics
router.get('/:userId', getUserStatisticsController.getUserStatistics);

module.exports = router;
