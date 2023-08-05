const mongoose = require('mongoose');
const User = require('./models/UserModel');

// Replace 'your-mongodb-connection-string' with your actual MongoDB connection URL
const mongoDBConnectionString = 'mongodb+srv://user0xdefault:SsXgFCxTSHDRKAz0@cluster0.ltqemr5.mongodb.net/';

mongoose
  .connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Seed data for users
    const userData = [
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' },
      // Add more users here if needed
    ];

    // Create users in the database
    try {
      await User.insertMany(userData);
      console.log('Seed data inserted successfully.');
    } catch (error) {
      console.error('Error inserting seed data:', error);
    }

    // Close the connection to the database
    mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
