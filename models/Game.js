// models/Game.js
const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
  player1: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  player2: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
  },
  player1Ships: [{
    type: Schema.Types.ObjectId,
    ref: 'Ship'
  }],
  player2Ships: [{
    type: Schema.Types.ObjectId,
    ref: 'Ship'
  }],
  player1Board: [[String]],
  player2Board: [[String]],
  currentTurnPlayer: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
  },
  status: {
    type: String,
    enum: ['active', 'ended'], // You can define other status values as needed
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = model('Game', gameSchema);

module.exports = Game;
