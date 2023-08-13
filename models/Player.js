// models/Player.js
const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Pull from User model
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    shipPlacements: [{
      shipId: Schema.Types.ObjectId, // Reference to Ship model
      positions: [String], // Array of grid positions (e.g., ["A1", "A2", "A3"])
    }],
  });
  
  const Player = model('Player', playerSchema);
  
  module.exports = Player;