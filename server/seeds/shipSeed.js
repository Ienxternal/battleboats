const mongoose = require('mongoose');
const Ship = require('../models/Ship'); // Assuming the models folder is one level up

// Replace this with your actual MongoDB URI
const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;

// Sample ship data
const shipsData = [
  {
    name: 'Carrier',
    size: 5,
  },
  {
    name: 'Battleship',
    size: 4,
  },
  {
    name: 'Cruiser',
    size: 3,
  },
  {
    name: 'Submarine',
    size: 3,
  },
  {
    name: 'Destroyer',
    size: 2,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB database');

    // Clear the Ship collection before seeding
    await Ship.deleteMany();

    // Insert the sample ships into the Ship collection
    const insertedShips = await Ship.insertMany(shipsData);
    console.log('Seeding completed successfully.');

    // Close the database connection
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
