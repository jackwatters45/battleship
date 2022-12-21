import Gameboard from './gameboard';

export class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard();
    this.opponentGameboard;
    this.moves = [];
  }

  setOpponentGameboard(opponentGameboard) {
    this.opponentGameboard = opponentGameboard;
  }

  attack(coordinate) {
    this.moves.push({
      coordinate: coordinate,
      coordinateData: this.opponentGameboard.board[coordinate],
    });
    return this.opponentGameboard.receiveAttack(coordinate);
  }
}

export class Computer extends Player {
  constructor() {
    super('Computer');
    this.search = this.#newSearch();
  }

  #newSearch() {
    return { searching: false, coordinate: null, ships: [] };
  }

  randomAttack() {
    let nextCoordinate = this.#generateCoordinates();
    if (this.moves.length > 0) {
      let previousMove = this.moves[this.moves.length - 1];

      // if ship was sunk last turn just use the random coordinate and reset search
      if (previousMove['coordinateData']['shipPlaced']['sunk']) {
        this.search = this.#newSearch();
        return this.attack(nextCoordinate);
      }

      // if not currently searching and hit a ship add search data
      if (
        !this.search['searching'] &&
        previousMove['coordinateData'].shipPlaced
      ) {
        console.log('here issue?');
        this.search['coordinate'] = previousMove['coordinate'];
        this.search['searching'] = 'above';
        console.log(this.search);
      }

      // if currently searching
      if (this.search['searching'])
        // search based using either the original coordinate or the previous depending on if the previous move hit a ship
        nextCoordinate = previousMove['coordinateData'].shipPlaced
          ? this.#searchAround(previousMove['coordinate'])
          : (this.#getNextSearchDirection(),
            this.#searchAround(this.search['coordinate']));
    }
    return this.attack(nextCoordinate);
  }

  #getNextSearchDirection() {
    const searchDirections = ['above', 'below', 'left', 'right'];
    const currentIndex = searchDirections.indexOf(this.search['searching']);
    const newIndex = currentIndex + 1;
    this.search['searching'] = searchDirections[newIndex];
  }

  // a little buggy so look into that
  // needs to keep track of each indiviaul ship it comes in contact with nd use that a like a queue
  // why the h does the x disapear somethimes
  #searchAround(searchCoordinate) {
    console.log(searchCoordinate);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const [row, ...column] = searchCoordinate.split('');
    const rowIndex = letters.indexOf(row);

    let nextCoordinate;
    switch (this.search['searching']) {
      case 'above': {
        nextCoordinate = `${letters[rowIndex - 1]}${column}`;
        if (Object.keys(this.opponentGameboard.board).includes(nextCoordinate))
          return nextCoordinate;
      }
      case 'below': {
        nextCoordinate = `${letters[rowIndex + 1]}${column}`;
        if (Object.keys(this.opponentGameboard.board).includes(nextCoordinate))
          return nextCoordinate;
      }
      case 'left':
        nextCoordinate = `${row}${parseInt(column) - 1}`;
        if (Object.keys(this.opponentGameboard.board).includes(nextCoordinate))
          return nextCoordinate;
      case 'right':
        nextCoordinate = `${row}${parseInt(column) + 1}`;
        if (Object.keys(this.opponentGameboard.board).includes(nextCoordinate))
          return nextCoordinate;
    }
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
