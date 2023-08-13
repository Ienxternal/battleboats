import React from 'react';

const GameBoard = ({ player1Board, player2Board, currentPlayer, handleOpponentCellClick }) => {
    const isPlayer1 = currentPlayer === 'player1';

    return (
        <div className="game-board">
            <div className="player-board">
                <h3>{isPlayer1 ? 'Your Board' : 'Opponent Board'}</h3>
                <div className="board">
                    {/* Render the player1Board cells */}
                </div>
            </div>
            <div className="player-board">
                <h3>{isPlayer1 ? 'Opponent Board' : 'Your Board'}</h3>
                <div className="board">
                    {/* Render the player2Board cells */}
                    {player2Board.map((row, rowIndex) => (
                        <div key={rowIndex} className="board-row">
                            {row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`board-cell ${cell}`}
                                    onClick={() => handleOpponentCellClick(rowIndex, colIndex)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameBoard;
