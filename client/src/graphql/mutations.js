// src/graphql/mutations.js
import { gql } from '@apollo/client';

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
export const TAKE_TURN_MUTATION = gql`
    mutation TakeTurn($gameId: ID!, $playerId: ID!, $shotPosition: [Int!]!) {
        takeTurn(gameId: $gameId, playerId: $playerId, shotPosition: $shotPosition) {
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
            player1Board {
                rows
            }
            player2Board {
                rows
            }
            # Add more fields as needed for the updated game state after taking a turn
        }
    }
`;
export const SHOT_ATTEMPT_MUTATION = gql`
    mutation ShotAttempt($gameId: ID!, $row: Int!, $col: Int!) {
        attemptShot(gameId: $gameId, row: $row, col: $col) {
        # Define the fields you want to return after the shot attempt
        # For example, you might return whether it was a hit or a miss
        }
    }
`;

