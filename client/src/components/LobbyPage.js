import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Lobby = () => {
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/recent-games') // Replace with your actual API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRecentGames(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="lobby-container">
      <div className="lobby-buttons">
        <Link to="/create-game">
          <button>Create Game</button>
        </Link>
      </div>
      <div className="recent-games">
        <h2>Recent Games</h2>
        <ul>
          {recentGames.map(game => (
            <li key={game.id}>
              <Link to={`/game/${game.id}`}>{/* Display game details, e.g., game name or ID */}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lobby;
