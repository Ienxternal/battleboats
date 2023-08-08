// models/GameModel.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  player1: { type: String, default: null },
  player2: { type: String, default: null },
  status: { type: String, enum: ['waiting', 'in_progress', 'player1_won', 'player2_won'], default: 'waiting' },
  turn: { type: String, enum: ['player1', 'player2'], default: 'player1' },
  // Add more properties as needed based on your game logic
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
