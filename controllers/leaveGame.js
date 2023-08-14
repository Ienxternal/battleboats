const leaveGame = async (req, res) => {
    try {
        const { gameId } = req.params;
        const userId = req.user._id; // Assuming you have user information in req.user

        // Retrieve the game from the database
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Check if the user is a participant of the game
        if (!game.players.includes(userId)) {
            return res.status(400).json({ message: 'You are not a participant of this game' });
        }

        // Remove the user from the list of players
        game.players = game.players.filter(playerId => playerId !== userId);

        // Save the updated game
        await game.save();

        res.status(200).json({ message: 'You have left the game successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { leaveGame };
