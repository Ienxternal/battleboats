const getGameHistory = async (req, res) => {
    try {
      // Implement the logic to retrieve the game history and moves of a specific game
        const gameId = req.params.gameId;

        // Assuming you have a Game model that represents games in your database
        const game = await Game.findById(gameId).populate('moves'); // Assuming 'moves' is the field referencing moves in the Game model

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Respond with the game history or appropriate data
        res.status(200).json({ gameHistory: game.moves });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getGameHistory };
