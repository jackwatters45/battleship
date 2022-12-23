/* eslint-disable no-use-before-define */
import './styles/style.css';
import Player from './classes/player';
import Computer from './classes/computer';
import clearBoard from './dom/clearBoard';
import displayEmptyGameboard from './dom/displayEmptyGameboard';
import displayShips from './dom/displayShips';
import isSunk from './dom/isSunk';
import addSymbol from './dom/addSymbol';
import gameOver from './dom/gameOver';
import toggleOrientation from './dom/toggleOrientation';

// eslint-disable-next-line no-unused-expressions
('use strict');

const leftBoard = document.querySelector('.left-board');
const rightBoard = document.querySelector('.right-board');

const newGame = document.querySelector('.restart');

const gameLoop = () => {
  // clear the board before a new game
  clearBoard(leftBoard, rightBoard);

  // create players and set opponent gameboards
  const player = new Player('User');
  const cpu = new Computer();
  player.setOpponentGameboard(cpu.gameBoard);
  cpu.setOpponentGameboard(player.gameBoard);

  // create gameboards
  displayEmptyGameboard(player.gameBoard, leftBoard);
  displayEmptyGameboard(cpu.gameBoard, rightBoard);

  // randomly place ships
  player.gameBoard.placeRandShips();
  cpu.gameBoard.placeRandShips();

  // display ships
  displayShips(player.gameBoard.shipsPlaced, leftBoard);
  displayShips(cpu.gameBoard.shipsPlaced, rightBoard);

  // add listeners to allow user to attack
  addAttackListeners(player, cpu);
};

newGame.addEventListener('click', () => {
  gameLoop();
});

const addAttackListeners = (player, cpu) => {
  const rightBoxes = document.querySelectorAll('.right-board-box');
  rightBoxes.forEach((box) => box.addEventListener('click', () => {
    if (userAttack(box, player)) {
      setTimeout(cpuAttack, 200, cpu);
    }
  }));
};

const orientationButton = document.querySelector('.orientation');
orientationButton.addEventListener('click', toggleOrientation);

const cpuAttack = (cpu) => {
  const attackResults = cpu.randomAttack();
  const boxCoordinate = cpu.moves[cpu.moves.length - 1].coordinate;
  const box = document.querySelector(`.left-board-box#${boxCoordinate}`);
  addSymbol(attackResults, box);
  if (attackResults.sunk) {
    isSunk(attackResults, box);
    if (cpu.opponentGameboard.allShipsSunk()) gameOver(cpu);
  }
};

const userAttack = (box, player) => {
  if (!player.opponentGameboard.isAlreadyAttacked(box.id)) {
    const attackResults = player.attack(box.id);
    addSymbol(attackResults, box);
    if (attackResults.sunk) {
      isSunk(attackResults, box);
      if (player.opponentGameboard.allShipsSunk()) {
        return gameOver(player);
      }
    }
    return true;
  }
  return false;
};

gameLoop();
