import React from 'react';
import { useHistory } from 'react-router-dom';

const CreateGame = () => {
    const history = useHistory();

    const handleCreateGame = () => {
        // Logic to create a new game
        // For example, you can use Apollo Client's useMutation hook to call your addGame mutation
        // After creating the game, navigate to the game page
        history.push("/game/:gameId"); // Replace ":gameId" with the actual game ID
    };

    return (
        <div className="create-game-container">
        <button onClick={handleCreateGame}>Create Game</button>
        </div>
    );
};

export default CreateGame;
