import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useMutation } from '@apollo/client';
import { ADD_GAME } from '../graphql/mutations'; // Import your mutation query

const CreateGamePage = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Use the useMutation hook
    const [createGame] = useMutation(ADD_GAME, {
        onCompleted: (data) => {
            const gameId = data.createGame.id;
            navigate(`/game/${gameId}`); // Use navigate function to redirect
        },
    });

    const handleCreateGame = () => {
        // Call the createGame mutation function
        createGame();
    };

    return (
        <div className="create-game-container">
            <button onClick={handleCreateGame}>Create Game</button>
        </div>
    );
};

export default CreateGamePage; // Change the export statement
