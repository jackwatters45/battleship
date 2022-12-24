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
import { dragStart, drop } from './dom/dragShips';

// eslint-disable-next-line no-unused-expressions
('use strict');

const leftBoard = document.querySelector('.left-board');
const rightBoard = document.querySelector('.right-board');
const ships = document.querySelectorAll('.ship');
const newGame = document.querySelector('.restart');
newGame.addEventListener('click', () => gameLoop());
const orientationButton = document.querySelector('.orientation');
orientationButton.addEventListener('click', toggleOrientation);
const shipContainer = document.querySelector('.ships-container');

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

  // randomly place cpu ships
  cpu.gameBoard.placeRandShips();

  // add listener to placeship
  placeShips(player, cpu);
};

const addAttackListeners = (player, cpu) => {
  const rightBoxes = document.querySelectorAll('.right-board-box');
  rightBoxes.forEach((box) => box.addEventListener('click', () => {
    if (userAttack(box, player)) {
      setTimeout(cpuAttack, 200, cpu);
    }
  }));
};

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
      if (player.opponentGameboard.allShipsSunk()) return gameOver(player);
    }
    return true;
  }
  return false;
};

const placeShips = (player, cpu) => {
  const placeableBoxes = document.querySelectorAll('.left-board-box');
  ships.forEach((ship) => ship.addEventListener('dragstart', dragStart));
  placeableBoxes.forEach((box) => {
    box.addEventListener('dragover', (e) => e.preventDefault());
    box.addEventListener('dragenter', (e) => e.preventDefault());
    box.addEventListener('drop', (e) => {
      const shipData = drop(e);
      if (shipData) {
        if (
          player.gameBoard.userPlaceShip(
            shipData.start,
            shipData.isHorizontal,
            shipData.length,
            shipData.name,
          )
        ) {
          displayShips(player.gameBoard.shipsPlaced, leftBoard);
          // hide the ship in the ship bank and return its data
          shipData.ship.classList.add('hidden');
        }
        if (player.gameBoard.shipsPlaced.length === 5) {
          shipContainer.classList.add('hidden');
          addAttackListeners(player, cpu);
        }
      }
    });
  });
};

gameLoop();
