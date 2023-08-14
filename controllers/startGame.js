const startGame = async (req, res) => {
    try {
        const gameId = req.params.gameId;

        // Respond with a success message or appropriate data
        res.status(200).json({ message: 'Game started successfully', gameId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { startGame };
