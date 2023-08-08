// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB database'));
