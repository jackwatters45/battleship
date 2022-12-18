import './styles/style.css';
import { Computer, Player } from './classes/player';

('use strict');

const leftBoard = document.querySelector(`.left-board`);
const rightBoard = document.querySelector(`.right-board`);
const newGame = document.querySelector('.restart');

// The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
const gameLoop = () => {
  clearBoard();
  // create players
  const player = new Player('Me');
  const cpu = new Computer();
  player.setOpponentGameboard(cpu.gameBoard);
  cpu.setOpponentGameboard(player.gameBoard);

  // create gameboards
  displayEmptyGameboard(player.gameBoard, leftBoard);
  displayEmptyGameboard(cpu.gameBoard, rightBoard);

  // add event listeners to boxes now that they exist
  const rightBoxes = document.querySelectorAll(`.right-board-box`);
  rightBoxes.forEach((box) =>
    box.addEventListener('click', () => attack(box, player))
  );
  // place ships
  /// random
  player.gameBoard.placeRandShips();
  cpu.gameBoard.placeRandShips();
  // TODO actually display board
  displayShips(player.gameBoard.shipsPlaced, leftBoard);
  displayShips(cpu.gameBoard.shipsPlaced, rightBoard); // Delete once done testing

  /// TODO user places ships

  //
  // loop to take turns attacking
  /// user -> clicks oponents board to select where to attack
  /// oponent -> random attack
  //// some sort of inication for a hit vs miss
  //// display info when a ship is sunk

  // game over when all of one players ships are sunk
  /// click new game to play again
};

const displayEmptyGameboard = (gameBoard, board) => {
  for (const key of Object.keys(gameBoard.board)) {
    let newBox = document.createElement('div');
    newBox.classList.add('box');
    newBox.classList.add(`${board.classList}-box`);
    newBox.id = key;
    board.appendChild(newBox);
  }
};

const attack = (box, player) => {
  player.attack(box.id);
  box.style.backgroundColor = 'green';
};

const displayShips = (shipsPlaced, board) => {
  shipsPlaced.forEach((ship) => {
    const shipColor = getShipColor(ship.name);
    for (const coordinate of ship.coordinates) {
      const cell = document.querySelector(`.${board.className} #${coordinate}`);
      cell.style.backgroundColor = shipColor;
      cell.style.border = 'solid 1px #776e65';
      cell.classList.add(ship.name);
    }
  });
};

const getShipColor = (shipName) => {
  const colors = {
    Carrier: '#edd073',
    Battleship: '#f75f3b',
    Cruiser: '#f77c5f',
    Submarine: '#f69664',
    Destroyer: '#f3b27a',
  };
  return colors[shipName];
};

const displayAttacks = () => {};

const clearBoard = () => {
  leftBoard.innerHTML = '';
  rightBoard.innerHTML = '';
};

newGame.addEventListener('click', () => {
  gameLoop();
});

gameLoop();
