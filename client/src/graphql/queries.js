// src/graphql/queries.js
import { useQuery, useMutation } from '@apollo/client';
import { GET_SHIPS, ADD_GAME, SHOT_ATTEMPT_MUTATION, GET_GAME_DETAILS, GET_ACTIVE_GAMES, ADD_PLAYER, GET_USER_DETAILS } from '../graphql/queries';

// Query to get a list of ships
export const GET_SHIPS = gql`
  query GetShips {
    ships {
      _id
      name
      size
    }
  }
`;

// Mutation to add a new game
export const ADD_GAME = gql`
  mutation AddGame($player1Id: ID!, $player2Id: ID) {
    addGame(player1Id: $player1Id, player2Id: $player2Id) {
      _id
      player1 {
        _id
        username
      }
      player2 {
        _id
        username
      }
    }
  }
`;

// Mutation to attempt a shot in the game
export const SHOT_ATTEMPT_MUTATION = gql`
  mutation ShotAttempt($gameId: ID!, $row: Int!, $col: Int!) {
    attemptShot(gameId: $gameId, row: $row, col: $col) {
      result # Define additional fields based on your backend's response
    }
  }
`;

// Query to get game details
export const GET_GAME_DETAILS = gql`
  query GetGameDetails($gameId: ID!) {
    game(id: $gameId) {
      _id
      player1 {
        _id
        username
      }
      player2 {
        _id
        username
      }
      status
      # Add more fields as needed for game details
    }
  }
`;

// Query to get a list of active games
export const GET_ACTIVE_GAMES = gql`
  query GetActiveGames($playerId: ID!) {
    activeGames(playerId: $playerId) {
      _id
      player1 {
        _id
        username
      }
      player2 {
        _id
        username
      }
      status
      # Add more fields as needed for active game details
    }
  }
`;

// Mutation to add a new player
export const ADD_PLAYER = gql`
  mutation AddPlayer($userId: ID!, $username: String!) {
    addPlayer(userId: $userId, username: $username) {
      _id
      username
      # Add more fields as needed for player details
    }
  }
`;

// Query to get user details
export const GET_USER_DETAILS = gql`
  query GetUserDetails($userId: ID!) {
    user(id: $userId) {
      _id
      username
      # Add more fields as needed for user details
    }
  }
`;

// ... Define more queries and mutations as needed
