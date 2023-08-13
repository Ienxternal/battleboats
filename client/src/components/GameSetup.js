import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SHIPS, SHOT_ATTEMPT_MUTATION } from '../graphql/queries'; // Import your queries and mutations
import { SHOT_ATTEMPT_MUTATION } from '../graphql/mutations'; // Import the mutation

import GameBoard from './GameBoard'; 
import OpponentBoard from './OpponentBoard';
import GameStatus from './GameStatus'; 

const GameSetup = () => {
    const [ships, setShips] = useState([]);
    const [selectedShip, setSelectedShip] = useState(null);
    const [gameBoard, setGameBoard] = useState([]);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Define isPlayerTurn state here

    const [playerGameBoard, setPlayerGameBoard] = useState([]);
    const [opponentGameBoard, setOpponentGameBoard] = useState([]);

    const { loading, error, data } = useQuery(GET_SHIPS);

    useEffect(() => {
        if (data && data.getShips) {
            setShips(data.getShips);
        }
    }, [data]);

    useEffect(() => {
        // Initialize the game board when ships or other dependencies change
        const rows = 10;
        const cols = 10;
        const emptyCell = 'empty';
        const board = [];
        for (let i = 0; i < rows; i++) {
            const row = Array(cols).fill(emptyCell);
            board.push(row);
        }
        setGameBoard(board);
        
        // Initialize player's game board
        const playerBoard = initializeEmptyBoard();
        setPlayerGameBoard(playerBoard);

        // Initialize opponent's game board
        const opponentBoard = initializeEmptyBoard();
        setOpponentGameBoard(opponentBoard);
    }, [ships]);

    const [attemptShot] = useMutation(SHOT_ATTEMPT_MUTATION);
    
    const handleCellClick = (row, col) => {
        if (selectedShip) {
            const shipSize = selectedShip.size;
        
            // Check if the ship can be placed horizontally without going out of bounds
            if (col + shipSize <= 10) {
                // Check if the cells are empty
                let isValidPlacement = true;
                for (let i = col; i < col + shipSize; i++) {
                    if (gameBoard[row][i] !== 'empty') {
                        isValidPlacement = false;
                        break;
                    }
                }
        
                if (isValidPlacement) {
                    // Update the game board state with the ship placement
                    const updatedBoard = [...gameBoard];
                    for (let i = 0; i < shipSize; i++) {
                        updatedBoard[row][col + i] = selectedShip.name;
                    }
                    setGameBoard(updatedBoard);
                } else {
                    // Display an error message or handle invalid placement
                }
            } else {
                // Display an error message or handle invalid placement
            }
        }
    };

    const handleOpponentCellClick = async (row, col) => {
        // Check if it's the player's turn and the cell hasn't been clicked before
        if (isPlayerTurn && opponentGameBoard[row][col] === 'empty') {
            try {
                // Call the attemptShot mutation
                const { data } = await attemptShot({
                    variables: {
                        gameId: // Provide the game ID,
                        row,
                        col
                    }
                });

                // Handle the result of the shot attempt
                const shotResult = data.attemptShot.result; // Assuming your mutation returns the result

                const updatedOpponentBoard = [...opponentGameBoard];
                if (shotResult === 'hit') {
                    updatedOpponentBoard[row][col] = 'hit';
                } else if (shotResult === 'miss') {
                    updatedOpponentBoard[row][col] = 'miss';
                }
                // Implement any additional logic for handling other possible shot results
                setOpponentGameBoard(updatedOpponentBoard);

                // Disable clicking on the opponent's board during the opponent's turn
                setIsPlayerTurn(false);

                // ... (rest of the function)
            } catch (error) {
                // Handle errors
            }
        }
    }
        
    const handleShipClick = (ship) => {
        setSelectedShip(ship);
    };

    return (
        <div>
            <GameStatus
                currentPlayer={currentPlayer} // Pass the current player state
                gameStatus={gameStatus} // Pass the game status state
                winner={winner} // Pass the winner state
            />
            <h2>Game Setup</h2>
            <div className="ship-list">
                {ships.map((ship) => (
                    <div
                        key={ship.name}
                        className={`ship ${selectedShip === ship ? 'selected' : ''}`}
                        onClick={() => handleShipClick(ship)}
                    >
                        {ship.name}
                    </div>
                ))}
            </div>
            <div className="game-board">
                {/* Render the game board cells and handle cell clicks */}
                {gameBoard.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className={`board-cell ${cell}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Render player and opponent game boards */}
            <div>
                <h2>Your Game Board</h2>
                <GameBoard
                    board={playerGameBoard}
                    // Add any additional props or functions you need
                />
        
                <h2>Opponent's Game Board</h2>
                <OpponentBoard
                    board={opponentGameBoard}
                    currentPlayer={currentPlayer} // Pass the current player state
                    handleCellClick={handleOpponentCellClick} // Pass the handler function
                    isPlayerTurn={isPlayerTurn} // Pass the isPlayerTurn state
                />
                
                {/* ... Other components and elements */}
            </div>
        </div>
    );
};

export default GameSetup;
