import React from 'react';
import { Link } from 'react-router-dom';

const Lobby = () => {
  return (
    <div className="lobby-container">
      <div className="lobby-buttons">
        <Link to="/create-game">
          <button>Create Game</button>
        </Link>
      </div>
      <div className="recent-games">
        <h2>Recent Games</h2>
        {/* Display a list of 10 most recently created games */}
        {/* You can map through the list and display each game */}
      </div>
    </div>
  );
};

export default Lobby;
