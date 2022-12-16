import Gameboard from './gameboard';

export class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard();
    this.opponentGameboard;
    this.moves = [];
  }

  // TODO find better way to set this up -> probably just a create game function
  setOpponentGameboard(opponentGameboard) {
    this.opponentGameboard = opponentGameboard;
  }

  createNewGameboard() {
    this.gameBoard = new Gameboard();
  }

  attack(coordinates) {
    this.moves.push([coordinates, this.opponentGameboard.board[coordinates]]);
    return this.opponentGameboard.receiveAttack(coordinates);
  }
}

export class Computer extends Player {
  constructor() {
    super('Computer');
  }

  randomAttack() {
    return this.attack(this.#generateCoordinates());
  }

  #generateCoordinates() {
    // random row
    const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const rowNum = Math.floor(Math.random() * 10);
    const row = rowLetters[rowNum];
    // random column
    const column = Math.floor(Math.random() * 10 + 1);
    // return concatenated coordinate
    return `${row}${column}`;
  }
}
