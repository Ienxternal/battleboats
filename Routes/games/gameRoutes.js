const express = require('express');
const router = express.Router();
const createGameController = require('../controllers/createGame');
const getGamesController = require('../controllers/getGames');
const getGameDetailsController = require('../controllers/getGameDetails');
const joinGameController = require('../controllers/joinGame');
const leaveGameController = require('../controllers/leaveGame');
const startGameController = require('../controllers/startGame');
const makeMoveController = require('../controllers/makeMove');
const getGameHistoryController = require('../controllers/getGameHistory');
const endGameController = require('../controllers/endGame');
// Import other controllers as needed

// Define routes for each functionality
router.post('/', createGameController.createGame);

router.get('/', getGamesController.getGames);

router.get('/:gameId', getGameDetailsController.getGameDetails);
router.post('/:gameId/join', joinGameController.joinGame);
router.post('/:gameId/leave', leaveGameController.leaveGame);
router.post('/:gameId/start', startGameController.startGame);
router.post('/:gameId/move', makeMoveController.makeMove);
router.get('/:gameId/history', getGameHistoryController.getGameHistory);
router.post('/:gameId/end', endGameController.endGame);
// Add more routes for other functionalities here

module.exports = router;
