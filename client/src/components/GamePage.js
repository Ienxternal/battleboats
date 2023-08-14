import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { TAKE_TURN_MUTATION } from '../graphql/mutations';
import { GAME_SUBSCRIPTION } from '../graphql/subscriptions';
import GameBoard from './GameBoard';
import OpponentBoard from './OpponentBoard';
import GameStatus from './GameStatus';

const Game = () => {
    const { gameId } = useParams();
    const [gameState, setGameState] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);

    const { loading, data } = useQuery(GAME_SUBSCRIPTION, {
        variables: { gameId },
    });

    const [takeTurn] = useMutation(TAKE_TURN_MUTATION);

    useEffect(() => {
        if (data && data.gameUpdated) {
            setGameState(data.gameUpdated);

            // Get the authenticated player's ID (replace 'YOUR_PLAYER_ID' with actual logic)
            const currentPlayerId = 'YOUR_PLAYER_ID'; // Replace with actual player's ID
            const currentTurnPlayerId = data.gameUpdated.currentTurnPlayer._id;

            // Check if it's the player's turn based on the current turn player's ID
            setIsPlayerTurn(currentTurnPlayerId === currentPlayerId);
        }
    }, [data]);

    const handleCellClick = (row, col) => {
        if (isPlayerTurn) {
            // Take the turn using the authenticated player's ID
            const currentPlayerId = 'YOUR_PLAYER_ID'; // Replace with actual player's ID
            takeTurn({
                variables: {
                    gameId,
                    playerId: currentPlayerId,
                    shotPosition: [row, col],
                },
            }).catch(error => {
                console.error('Error taking turn:', error);
            });
        } else {
            // Display a message that it's not the player's turn
            console.log("It's not your turn.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!gameState) {
        return <p>Game not found.</p>;
    }

    return (
        <div>
            <GameStatus
                currentPlayer={gameState.currentTurnPlayer.username}
                gameStatus={gameState.status}
                winner={gameState.winner}
            />
            <div className="game-container">
                <div className="game-board">
                    <h2>Your Game Board</h2>
                    <GameBoard
                        board={gameState.player1Board.rows}
                        handleCellClick={handleCellClick}
                        isPlayerTurn={isPlayerTurn}
                    />
                </div>
                <div className="opponent-board">
                    <h2>Opponent's Game Board</h2>
                    <OpponentBoard board={gameState.player2Board.rows} />
                </div>
            </div>
        </div>
    );
};

export default Game;
