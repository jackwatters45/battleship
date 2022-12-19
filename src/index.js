import './styles/style.css';
import { Computer, Player } from './classes/player';
import clearBoard from './classes/dom/clearBoard';
import displayEmptyGameboard from './classes/dom/displayEmptyGameboard';
import displayShips from './classes/dom/displayShips';
import isSunk from './classes/dom/isSunk';
import addSymbol from './classes/dom/addSymbol';
import gameOver from './classes/dom/gameOver';

('use strict');

const leftBoard = document.querySelector(`.left-board`);
const rightBoard = document.querySelector(`.right-board`);
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
  // displayShips(cpu.gameBoard.shipsPlaced, rightBoard);

  // add listeners to allow user to attack
  addAttackListeners(player, cpu);
};

const addAttackListeners = (player, cpu) => {
  const rightBoxes = document.querySelectorAll(`.right-board-box`);
  rightBoxes.forEach((box) =>
    box.addEventListener('click', () => {
      if (userAttack(box, player)) cpuAttack(cpu);
    })
  );
};

const cpuAttack = (cpu) => {
  const attackResults = cpu.randomAttack();
  const boxCoordinate = cpu.moves[cpu.moves.length - 1][0];
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
      if (player.opponentGameboard.allShipsSunk()) gameOver(player);
    }
    return true;
  }
  return false;
};

newGame.addEventListener('click', () => {
  gameLoop();
});

gameLoop();
