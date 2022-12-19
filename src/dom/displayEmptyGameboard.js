export default (gameBoard, board) => {
  for (const key of Object.keys(gameBoard.board)) {
    let newBox = document.createElement('div');
    newBox.classList.add(`${board.classList}-box`);
    newBox.id = key;
    board.appendChild(newBox);
  }
};
