const Ship = require('../models/Ship');
const User = require('../models/UserModel');
const Game = require('../models/Game'); // Import the Game model
const { io, pubsub } = require('../socket'); // Import the socket.io instance and pubsub


const resolvers = {
  Query: {
    getShips: async () => {
      try {
        const ships = await Ship.find({});
        return ships;
      } catch (error) {
        console.error('Error fetching ships:', error);
        throw new Error('Failed to fetch ships. Please try again.');
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users');
      }
    }
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        // Create the user in the database
        const newUser = await User.create({ username, email, password });
        // Return the newly created user
        return newUser;
      } catch (error) {
        console.error('Error creating users:', error);
        throw new Error('Error creating user:', error);
      }
    },
    startGame: async (_, { player1, player2 }) => {
      try{
      // Create a new game in the database
      const newGame = await Game.create({ player1, player2, status: 'waiting' });
      // Emit socket event to start the game
      io.emit('startGame', newGame._id);
      return newGame;
      } catch (error) {
        throw new Error('Error creating user:', error);
      }
    },
    placeShip: async (_, { gameId, playerId, row, col, length, orientation }) => {
      // Validate and place the ship in the game
      // ...
      // Emit socket event to update the game
      io.to(gameId).emit('gameUpdated', updatedGame);
      return Ship;
    },
    makeMove: async (_, { gameId, row, col, playerId }) => {
      // Validate the move and update the game state
      // ...
      // Emit socket event to update the game
      io.to(gameId).emit('gameUpdated', updatedGame);
      return updatedGame;
    }
  },
  Subscription: {
    gameUpdated: {
      subscribe: (_, { gameId }) => {
        // Subscribe to updates for the specified game
        return pubsub.asyncIterator([`GAME_UPDATED_${gameId}`]);
      },
    },
  },
};
module.exports = resolvers;