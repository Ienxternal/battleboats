const Game = require('../models/Game'); // Import the Game model

const getGames = async (req, res) => {
    try {
        // Retrieve a list of all games from the database
        const games = await Game.find();

        // Respond with the list of games
        res.status(200).json(games);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getGames };
