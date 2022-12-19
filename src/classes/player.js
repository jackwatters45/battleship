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

  attack(coordinate) {
    this.moves.push([coordinate, this.opponentGameboard.board[coordinate]]);
    return this.opponentGameboard.receiveAttack(coordinate);
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
    let coordinate = false;

    while (!coordinate) {
      const keys = Object.keys(this.opponentGameboard.board);
      const randKey = Math.floor(keys.length * Math.random());
      const randomCoordinate = keys[randKey];
      if (!this.opponentGameboard.board[keys[randKey]].attacked)
        coordinate = randomCoordinate;
    }
    return coordinate;
  }
}

// // random row
// const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
// const rowNum = Math.floor(Math.random() * 10);
// const row = rowLetters[rowNum];
// // random column
// const column = Math.floor(Math.random() * 10 + 1);
// // return concatenated coordinate
// // return `${row}${column}`;
