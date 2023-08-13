// src/components/OpponentBoard.js
import React from 'react';

const OpponentBoard = ({ board, handleCellClick }) => {
    return (
        <div className="game-board">
            <div className="opponent-board">
                <h3>Opponent Board</h3>
                <div className="board">
                    {board.map((row, rowIndex) => (
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
            </div>
        </div>
    );
};

export default OpponentBoard;
