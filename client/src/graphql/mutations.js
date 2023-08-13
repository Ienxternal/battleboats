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
const SHOT_ATTEMPT_MUTATION = gql`
    mutation ShotAttempt($gameId: ID!, $row: Int!, $col: Int!) {
        attemptShot(gameId: $gameId, row: $row, col: $col) {
        # Define the fields you want to return after the shot attempt
        # For example, you might return whether it was a hit or a miss
        }
    }
`;
