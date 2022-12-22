import Gameboard from './gameboard';

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard();
    this.moves = [];
  }

  setOpponentGameboard(opponentGameboard) {
    this.opponentGameboard = opponentGameboard;
  }

  attack(coordinate) {
    this.moves.push({
      coordinate,
      coordinateData: this.opponentGameboard.board[coordinate],
    });
    return this.opponentGameboard.receiveAttack(coordinate);
  }
}
