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

// click new game button =>
gameLoop();
