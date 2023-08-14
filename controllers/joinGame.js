const joinGame = async (req, res) => {
    try {
        const gameId = req.params.gameId;
        const userId = req.user.id; // Assuming you have authenticated user data in req.user

        // Implement the logic to allow a user to join a specific game
        // For example, you can update the game document in the database to add the user to the players array
        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Check if the game is already started
        if (game.status === 'started') {
            return res.status(400).json({ message: 'Cannot join, the game has already started' });
        }

        // Check if the user is already part of the game
        if (game.players.includes(userId)) {
            return res.status(400).json({ message: 'User is already part of the game' });
        }

        // Add the user to the players array
        game.players.push(userId);
        await game.save();

        // Respond with a success message or appropriate data
        res.status(200).json({ message: 'Joined the game successfully', game });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { joinGame };
