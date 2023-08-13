import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import { useMutation, useQuery } from '@apollo/client';
import { GAME_SUBSCRIPTION, TAKE_TURN_MUTATION } from '../graphql'; // Import your subscriptions and mutations
import GameBoard from './GameBoard';
import OpponentBoard from './OpponentBoard';
import GameStatus from './GameStatus';

const Game = () => {
    const { gameId } = useParams(); // Get the gameId from route parameters
    const [gameState, setGameState] = useState(null); // Store the game state
    const [isPlayerTurn, setIsPlayerTurn] = useState(false); // Define isPlayerTurn state

    // Use the subscription to update the game state in real-time
    const { loading, data } = useQuery(GAME_SUBSCRIPTION, {
        variables: { gameId },
    });

    // Use the takeTurn mutation to handle player's turns
    const [takeTurn] = useMutation(TAKE_TURN_MUTATION);

    useEffect(() => {
        if (data && data.gameUpdated) {
            setGameState(data.gameUpdated);
            
            // Check if it's the player's turn based on currentTurnPlayer
            const currentPlayerId = 'YOUR_PLAYER_ID'; // Replace with the actual player's ID
            setIsPlayerTurn(data.gameUpdated.currentTurnPlayer._id === currentPlayerId);
        }
    }, [data]);

    const handleCellClick = (row, col) => {
        if (isPlayerTurn) {
            // Call the takeTurn mutation
            takeTurn({
                variables: {
                    gameId,
                    playerId: 'YOUR_PLAYER_ID', // Replace with the actual player's ID
                    shotPosition: [row, col],
                },
            }).catch(error => {
                console.error('Error taking turn:', error);
            });
        } else {
            // Display a message that it's not the player's turn
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
                currentPlayer={gameState.currentTurnPlayer.username} // Display the current player's username
                gameStatus={gameState.status}
                winner={gameState.winner}
            />
            <div className="game-container">
                <div className="game-board">
                    {/* Render the player's game board */}
                    <h2>Your Game Board</h2>
                    <GameBoard
                        board={gameState.player1Board.rows}
                        handleCellClick={handleCellClick}
                        isPlayerTurn={isPlayerTurn}
                    />
                </div>
                <div className="opponent-board">
                    {/* Render the opponent's game board */}
                    <h2>Opponent's Game Board</h2>
                    <OpponentBoard board={gameState.player2Board.rows} />
                </div>
            </div>
        </div>
    );
};

export default Game;
