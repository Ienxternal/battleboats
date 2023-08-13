const { Thought } = require('../models');
const { Ship } = require('../models');
const { Player } = require('../models');
const { Game } = require('../models');
const { User } = require('../models');
const { initializeEmptyBoard } = require('../utils/initializeBoard');
const { withFilter } = require('graphql-subscriptions');

const resolvers = {
  Query: {
    thoughts: async () => {
      return Thought.find().sort({ createdAt: -1 });
    },

    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },

    getShips: async () => {
      // Implement your logic to fetch ships from your database (e.g., MongoDB)
      const ships = await Ship.find(); 
      
      return ships;
    },

    users: async () => { 
      return User.find(); 
    }, 
    user: async (parent, { userId }) => {
      return User.findById(userId);
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const newUser = new User({ username, email, password });
      
      await newUser.save();
      
      return newUser;
    },

    addGame: async (parent, { player1Id, player2Id }) => {
      const newGame = new Game({
        player1: player1Id,
        player2: player2Id,
        player1Board: initializeEmptyBoard(), // Implement this function to create an empty board
        player2Board: initializeEmptyBoard(),
      });

      await newGame.save();

      return newGame;
    },

    attemptShot: async (_, { gameId, row, col }, { dataSources }) => {
      // Logic to handle the shot attempt in your backend
      // Determine if it's a hit or a miss, update the game state, and return the result
    },

    addPlayerShipPlacements: async (parent, { playerId, shipPlacements }) => {
      try {
        // Find the player by ID
        const player = await Player.findById(playerId);
    
        if (!player) {
          throw new Error('Player not found');
        }
    
        // Update or add ship placements to the existing array
        shipPlacements.forEach(shipPlacement => {
          const existingPlacementIndex = player.shipPlacements.findIndex(existingPlacement =>
            existingPlacement.shipId.toString() === shipPlacement.shipId
          );
    
          if (existingPlacementIndex !== -1) {
            // Update existing ship placement
            player.shipPlacements[existingPlacementIndex].positions = shipPlacement.positions;
          } else {
            // Add new ship placement
            player.shipPlacements.push({
              shipId: shipPlacement.shipId,
              positions: shipPlacement.positions,
            });
          }
        });
    
        // Save the updated player object
        const updatedPlayer = await player.save();
    
        return updatedPlayer;
      } catch (error) {
        throw new Error(`Failed to add ship placements: ${error.message}`);
      }
    },

    startGame: async (parent, { player1Id, player2Id }) => {
      // Verify that both players exist
      const player1 = await Player.findById(player1Id);
      const player2 = await Player.findById(player2Id);

      if (!player1 || !player2) {
        throw new Error("Both players must exist to start a game.");
      }

      // Create a new game instance
      const newGame = new Game({
        player1: player1Id,
        player2: player2Id,
        // Initialize other game-related data as needed
      });

      await newGame.save();

      // Update player records (if needed)
      player1.isInGame = true;
      player2.isInGame = true;
      await Promise.all([player1.save(), player2.save()]);

      return newGame;
    },

    takeTurn: async (parent, { gameId, playerId, shotPosition }) => {
      // Verify that the game exists
      const game = await Game.findById(gameId);
    
      if (!game) {
        throw new Error("Game not found.");
      }
    
      // Verify that it's the provided player's turn
      if (game.currentTurnPlayer !== playerId) {
        throw new Error("It's not your turn to take a shot.");
      }
    
      // Assuming you have player boards for both players in the game model
      const currentPlayerBoard = playerId === game.player1.toString() ? game.player1Board : game.player2Board;
      const opponentPlayerBoard = playerId === game.player1.toString() ? game.player2Board : game.player1Board;
    
      // Check if the shot hits the opponent's ship
      const [row, col] = shotPosition;
      const targetCell = opponentPlayerBoard[row][col];
      
      // Implement the ship hit/miss logic here
      if (targetCell === 'ship') {
        // Hit a ship
        opponentPlayerBoard[row][col] = 'hit';
      } else if (targetCell === 'empty') {
        // Missed the ship
        opponentPlayerBoard[row][col] = 'miss';
      } else {
        // Cell was already hit or is out of bounds
        throw new Error("Invalid shot position.");
      }
    
      // Update the game state with the new player boards and other relevant info
      game.player1Board = playerId === game.player1.toString() ? currentPlayerBoard : opponentPlayerBoard;
      game.player2Board = playerId === game.player2.toString() ? currentPlayerBoard : opponentPlayerBoard;
    
      // Switch the turn to the other player
      game.currentTurnPlayer = game.currentTurnPlayer === game.player1.toString() ? game.player2.toString() : game.player1.toString();
    
      // Save the updated game state
      await game.save();
    
      return game;
    },

    endGame: async (parent, { gameId }) => {
      // Verify that the game exists
      const game = await Game.findById(gameId);
    
      if (!game) {
        throw new Error("Game not found.");
      }
    
      // Assuming you have player boards for both players in the game model
      const player1Board = game.player1Board;
      const player2Board = game.player2Board;
    
      // Check if all ships are sunk for each player
      const player1AllShipsSunk = player1Board.every(row => row.every(cell => cell === 'empty' || cell === 'hit'));
      const player2AllShipsSunk = player2Board.every(row => row.every(cell => cell === 'empty' || cell === 'hit'));
    
      if (player1AllShipsSunk) {
        game.winner = game.player2;
        game.status = 'ended';
      } else if (player2AllShipsSunk) {
        game.winner = game.player1;
        game.status = 'ended';
      } else {
        throw new Error("Game is not over yet.");
      }
    
      // Save the updated game state
      await game.save();
    
      return game;
    },     
      
    addThought: async (parent, { thoughtText, thoughtAuthor }) => {
      return Thought.create({ thoughtText, thoughtAuthor });
    },
    addComment: async (parent, { thoughtId, commentText }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeThought: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
    
    removePlayerFromGame: async (parent, { gameId, playerId }) => {
      try {
        const game = await Game.findById(gameId);

        if (!game) {
          throw new Error("Game not found.");
        }

        // Remove the player from the game and reset relevant fields
        if (game.player1 === playerId) {
          game.player1 = null;
          game.player1Board = createEmptyBoard();
        } else if (game.player2 === playerId) {
          game.player2 = null;
          game.player2Board = createEmptyBoard();
        } else {
          throw new Error("Player is not part of this game.");
        }

        // Update the game state and save
        await game.save();

        return game;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createPost: async (parent, args, context) => {
      // Create the post in your data store
      const newPost = createPostLogic(args); // Replace with your logic
      
      // Publish the event
      pubsub.publish('POST_CREATED', { postCreated: newPost });

      return newPost;
    }
  },
  Subscription: {
    postCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('POST_CREATED'),
        (payload, variables) => {
          // Implement your filtering logic here if needed
          return true; // Return true to always send the event
        }
      ),
    },
    gameStarted: {
      subscribe: () => pubsub.asyncIterator('GAME_STARTED'),
    },
  },
};

module.exports = resolvers;
