import { Computer, Player } from './classes/player';

// The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
const gameLoop = () => {
  // create players
  const player = new Player('Me');
  const cpu = new Computer();

  // place ships
  /// random
  player.gameBoard.placeRandShips();
  cpu.gameBoard.placeRandShips();
  /// user places
  // TODO

  let gameOver = false;
  let winner;
  let currentTurn = 'player';
  while (!gameOver) {
    // Take turns attacking
    if (currentTurn === 'player') {
      player.attack(generateCoordinates());
      currentTurn = 'cpu';
    } else {
      cpu.randomAttack();
      currentTurn = 'player';
    }
  }
  // eventually a winner
  console.log(winner, 'wins!');
  //
};

gameLoop();

// TODO ui for attacking

// TODO ui for placing ships

function generateCoordinates() {
  // random row
  const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const rowNum = Math.floor(Math.random() * 10);
  const row = rowLetters[rowNum];
  // random column
  const column = Math.floor(Math.random() * 10 + 1);
  // return concatenated coordinate
  return `${row}${column}`;
}
