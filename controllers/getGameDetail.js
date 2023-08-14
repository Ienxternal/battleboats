const Game = require('../models/Game'); // Make sure to import the appropriate Game model

const getGameDetails = async (req, res) => {
    try {
        const gameId = req.params.gameId;

        // Find the game by gameId
        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // You can customize the response format as needed
        res.status(200).json({
            gameId: game._id,
            // Include other game details you want to return
            // For example: createdBy, createdAt, status, etc.
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getGameDetails };
