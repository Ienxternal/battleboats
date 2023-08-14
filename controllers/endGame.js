const endGame = async (req, res) => {
    try {
        const gameId = req.params.gameId;
        
        // Implement the logic to end the game with the provided gameId
        // For example, you might update the game status to 'ended' in your database
        
        // Assuming you have a Game model/schema
        const updatedGame = await Game.findByIdAndUpdate(gameId, { status: 'ended' }, { new: true });

        if (!updatedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
    
        res.status(200).json({ message: 'Game ended successfully', game: updatedGame });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { endGame };
