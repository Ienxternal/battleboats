const express = require('express');
const router = express.Router();
const getGlobalLeaderboardController = require('../controllers/getGlobalLeaderboard');
const getFriendLeaderboardController = require('../controllers/getFriendLeaderboard');

// Define routes for global leaderboard and friend leaderboard
router.get('/leaderboard', getGlobalLeaderboardController.getGlobalLeaderboard);
router.get('/leaderboard/friends', getFriendLeaderboardController.getFriendLeaderboard);

module.exports = router;
