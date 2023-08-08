const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/UserModel');
const Game = require('./models/GameModel.js');
require('dotenv').config();
const { typeDefs, resolvers } = require('./graphQL/schema');

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

// Event listener for successful connection
db.on('connected', () => {
  console.log('Connected to MongoDB database');
});

// Event listener for connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// ... (existing routes for signup, login, and logout)

// Route for handling user signup
app.post('/api/signup', async (req, res) => {
  // ... (your signup logic)
});

// Route for handling user login
app.post('/api/login', async (req, res) => {
  // ... (your login logic)
});

// Route for handling user logout
app.get('/api/logout', (req, res) => {
  // ... (your logout logic)
});

// Define Apollo Server for GraphQL

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Pass the Express `req` object to the context for authentication in resolvers
});

// Apply Apollo Server middleware
server.start().then(() => {
  server.applyMiddleware({ app });

  // Set up Express server
  const PORT = process.env.PORT || 4000;
  const httpServer = app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });

  // Set up socket.io
  const io = require('socket.io')(httpServer);

  // ... (Socket.io logic for game interactions)

  io.on('connection', socket => {
    console.log('New client connected');
  
    socket.on('createGame', async () => {
      try {
        // Create a new game in the database and emit the game ID to the creator
        const newGame = await Game.create({ player1: socket.id });
        socket.emit('gameCreated', newGame._id);
      } catch (error) {
        console.error('Error creating game:', error);
        socket.emit('gameError', 'Failed to create a new game.');
      }
    });
  
    socket.on('joinGame', async gameId => {
      try {
        // Find the game in the database
        const game = await Game.findById(gameId);
  
        // Check if the game exists and is waiting for a player
        if (!game || game.status !== 'waiting') {
          socket.emit('gameError', 'Game not found or already in progress');
          return;
        }
  
        // Update the game state with the new player and emit a message to both players
        game.player2 = socket.id;
        game.status = 'in_progress';
        await game.save();
        io.to(gameId).emit('gameStarted', game._id);
      } catch (error) {
        console.error('Error joining game:', error);
        socket.emit('gameError', 'Failed to join the game');
      }
    });

    socket.on('invitePlayer', async (gameId, invitedPlayerId) => {
      try {
        // Find the game in the database
        const game = await Game.findById(gameId);
  
        // Check if the game exists and is waiting for players
        if (!game || game.status !== 'waiting') {
          socket.emit('gameError', 'Game not found or not in the right state');
          return;
        }
  
        // Check if the inviting player is the creator of the game
        if (game.player1 !== socket.id) {
          socket.emit('gameError', 'Only the creator can invite players');
          return;
        }
  
        // Find the invited player
        const invitedPlayer = await User.findById(invitedPlayerId);
  
        // Check if the invited player exists
        if (!invitedPlayer) {
          socket.emit('gameError', 'Invited player not found');
          return;
        }
  
        // Emit an invitation event to the invited player
        io.to(invitedPlayerId).emit('invitationReceived', {
          gameId,
          invitingPlayerId: socket.id,
        });
      } catch (error) {
        console.error('Error sending invitation:', error);
        socket.emit('gameError', 'Failed to send invitation');
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
  
    socket.on('turnPlayed', async (gameId, r, c) => {
      try {
        // Find the game in the database
        const game = await Game.findById(gameId);
  
        // Check if the game exists and is in progress
        if (!game || game.status !== 'in_progress') {
          socket.emit('gameError', 'Game not found or not in progress');
          return;
        }
  
        // Determine the current player's socket ID
        const currentPlayer = game.turn === 'player1' ? game.player1 : game.player2;
  
        // Check if it's the player's turn
        if (socket.id !== currentPlayer) {
          socket.emit('gameError', "It's not your turn");
          return;
        }
  
        // Process the player's move and update the game state (implement your game logic here)
        // For example, check if the move is valid, mark the cell as hit/miss, etc.
  
        // Switch the turn to the other player
        game.turn = game.turn === 'player1' ? 'player2' : 'player1';
        await game.save();
  
        // Notify both players about the move and the updated game state
        io.to(gameId).emit('turnPlayed', r, c, game);
  
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
  
      // Handle game disconnection logic if needed
    });
  });
  
  
});
