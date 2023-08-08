// models/Ship.js

const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const Ship = mongoose.model('Ship', shipSchema);

module.exports = Ship;
