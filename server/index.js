const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { typeDefs, resolvers } = require('./schema');
const User = require('./models/UserModel');
const Game = require('./models/GameModel.js');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Enable CORS middleware
app.use(cors());

// Replace this with your actual MongoDB URI
const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB database'));

// ... (existing routes for signup, login, and logout)






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

// Route for handling user logout
app.get('/api/logout', (req, res) => {
  // Your logout logic here (e.g., clearing session data, cookies, etc.)
  // For example:
  // req.session.destroy(); // Clear session data
  // res.clearCookie('token'); // Clear authentication token cookie

  return res.json({ message: 'Logout successful' });
});








// Route for creating a new game
app.post('/api/createGame', async (req, res) => {
  const { userId } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new game in the database
    const newGame = await Game.create({ createdBy: userId });
    return res.status(200).json({ success: true, gameId: newGame._id });
  } catch (error) {
    console.error('Error creating game:', error);
    return res.status(500).json({ success: false, error: 'Failed to create a new game.' });
  }
});

// Route for fetching the list of available games
app.get('/api/games', async (req, res) => {
  try {
    // Fetch the list of available games from the database
    const games = await Game.find({ status: 'waiting' }).populate('createdBy', 'username');
    return res.json({ games });
  } catch (error) {
    console.error('Error fetching games:', error);
    return res.status(500).json({ error: 'Failed to fetch the list of available games.' });
  }
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Pass the Express `req` object to the context for authentication in resolvers
});

server.start().then(() => {
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  const httpServer = app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });

  // Set up socket.io
  const io = require('socket.io')(httpServer);

  io.on('connection', socket => {
    console.log('New client connected');

    socket.on('joinGame', async gameId => {
      try {
        // Find the game in the database
        const game = await Game.findById(gameId);

        // Check if the game exists and is waiting for a player
        if (!game || game.status !== 'waiting') {
          socket.emit('gameError', 'Game not found or already in progress');
          return;
        }

        // Update the game state with the new player
        game.player2 = socket.id;
        game.status = 'in_progress';
        await game.save();

        // Join the game room
        socket.join(gameId);

        // Notify both players that the game has started
        io.to(gameId).emit('gameStarted', game._id);
      } catch (error) {
        console.error('Error joining game:', error);
        socket.emit('gameError', 'Failed to join the game');
      }
    });

    socket.on('startGame', async gameId => {
      try {
        // Find the game in the database
        const game = await Game.findById(gameId);

        // Check if the game exists and is waiting for a player
        if (!game || game.status !== 'waiting') {
          socket.emit('gameError', 'Game not found or already in progress');
          return;
        }

        // Update the game state to 'in_progress'
        game.status = 'in_progress';
        await game.save();

        // Notify both players that the game has started and it's Player 1's turn
        io.to(gameId).emit('gameStarted', game._id);
        io.to(game.player1).emit('yourTurn', true);
        io.to(game.player2).emit('yourTurn', false);
      } catch (error) {
        console.error('Error starting game:', error);
        socket.emit('gameError', 'Failed to start the game');
      }
    });

    socket.on('turnPlayed', async (gameId, r, c, playerId) => {
      try {
        // Find the game in the database
        const game = await Game.findById(gameId);

        // Check if the game exists and is in progress
        if (!game || game.status !== 'in_progress') {
          socket.emit('gameError', 'Game not found or not in progress');
          return;
        }

        // Check if it's the player's turn
        const isPlayerTurn = playerId === 'player1' ? game.player1 : game.player2;
        if (isPlayerTurn !== socket.id) {
          socket.emit('gameError', "It's not your turn");
          return;
        }

        // Update the game state with the player's move
        // (Add your game logic here based on the cell (r, c) selected by the player)
        // For example, you can check if it's a valid move, mark the cell as hit/miss, etc.
        // Also, you can check for game over conditions here.

        // Switch the turn to the other player
        game.turn = game.turn === 'player1' ? 'player2' : 'player1';
        await game.save();

        // Notify both players about the move and the updated game state
        io.to(gameId).emit('turnPlayed', r, c, playerId, game);

        // Notify the other player that it's their turn
        io.to(game[game.turn]).emit('yourTurn', true);
        io.to(game[game.turn === 'player1' ? 'player2' : 'player1']).emit('yourTurn', false);
      } catch (error) {
        console.error('Error processing turn:', error);
        socket.emit('gameError', 'Failed to process your turn');
      }
    });

    socket.on('disconnect', async () => {
      console.log('Client disconnected');

      // Find the game where the player was participating
      try {
        const game = await Game.findOne({ $or: [{ player1: socket.id }, { player2: socket.id }] });

        // If the game exists and is waiting for a player, update the game state and delete the game
        if (game && game.status === 'waiting') {
          await Game.deleteOne({ _id: game._id });
        }

        // If the game is in progress and the disconnected player's turn, update the game state and notify the other player
        if (game && game.status === 'in_progress') {
          if (game.turn === 'player1' && game.player1 === socket.id) {
            game.status = 'player2_won';
            await game.save();
            io.to(game.player2).emit('gameOver', 'Your opponent has disconnected. You win!');
          } else if (game.turn === 'player2' && game.player2 === socket.id) {
            game.status = 'player1_won';
            await game.save();
            io.to(game.player1).emit('gameOver', 'Your opponent has disconnected. You win!');
          }
        }
      } catch (error) {
        console.error('Error handling disconnection:', error);
      }
    });
  });
});
