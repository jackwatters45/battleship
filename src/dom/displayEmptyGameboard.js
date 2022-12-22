export default (gameBoard, board) => {
  Object.keys(gameBoard.board).forEach((key) => {
    const newBox = document.createElement('div');
    newBox.classList.add(`${board.classList}-box`);
    newBox.id = key;
    newBox.title = key;
    board.appendChild(newBox);
  });
};
