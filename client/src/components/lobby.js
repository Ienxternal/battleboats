import React, { useState, useEffect } from 'react';
import { fetchGames } from '../utils/fetch';

const Lobby = () => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    // Fetch the list of available games from the server
    fetchGames()
      .then((games) => {
        setGames(games);
      })
      .catch((error) => {
        console.error('Error fetching games:', error);
      });
  }, []);
  

  const handleCreateGame = async () => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'Your Game Name' }) // You can replace 'Your Game Name' with the actual name of the game you want to create
      });

      if (response.ok) {
        // You can handle the response here if needed
        console.log('Game created:', response.data);
        // After creating the game, fetch the updated list of games
        fetchGames();
      } else {
        console.error('Error creating game:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <div>
      <h2>Lobby</h2>
      <button onClick={handleCreateGame}>Create New Game</button>
      <h3>List of Games:</h3>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
