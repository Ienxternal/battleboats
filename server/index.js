const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const { typeDefs, resolvers } = require('./schema');

// Replace this with your actual MongoDB URI
const MONGO_URI = 'mongodb://localhost/battleship_db';

const app = express();
app.use(bodyParser.json());

// Enable CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB database'));

// Create a MongoDB model for users
const User = require('./models/UserModel');

// Route for handling user signup
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Validation (you can add more checks based on your requirements)
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please provide all fields' });
  }

  try {
    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already taken' });
    }

    // Create a new user in the database
    const newUser = await User.create({ username, email, password });
    return res.json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    return res.status(500).json({ error: 'Signup failed' });
  }
});

// Route for handling user login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username in the database
    const user = await User.findOne({ username });

    // Check if the user exists and the password matches (you should implement proper password hashing)
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.json({ message: 'Login successful', user });
  } catch (error) {
    return res.status(500).json({ error: 'Login failed' });
  }
});

// ... (other routes for lobby and logout)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Pass the Express `req` object to the context for authentication in resolvers
});

server.start().then(() => {
  server.applyMiddleware({ app });
  const PORT = 4000; // Use any port number you prefer
  app.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
