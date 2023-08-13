// models/Ship.js
const { Schema, model } = require('mongoose');


const shipSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const Ship = model('Ship', shipSchema);

module.exports = Ship;