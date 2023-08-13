// initializeBoard.js
function initializeEmptyBoard() {
    const rows = 10; // Number of rows on the game board
    const cols = 10; // Number of columns on the game board
    const emptyCell = 'empty';
  
    const board = [];
    for (let i = 0; i < rows; i++) {
      const row = Array(cols).fill(emptyCell);
      board.push(row);
    }
  
    return board;
  }
  
  module.exports = { initializeEmptyBoard };
  