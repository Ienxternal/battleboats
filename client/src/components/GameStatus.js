// src/components/GameStatus.js
import React from 'react';

const GameStatus = ({ currentPlayer, gameStatus, winner }) => {
    return (
        <div className="game-status">
        <p>{`Current Turn: ${currentPlayer === 'player1' ? 'Player 1' : 'Player 2'}`}</p>
        <p>{`Game Status: ${gameStatus === 'active' ? 'Active' : 'Ended'}`}</p>
        {gameStatus === 'ended' && <p>{`Winner: ${winner === 'player1' ? 'Player 1' : 'Player 2'}`}</p>}
        </div>
    );
};

export default GameStatus;
