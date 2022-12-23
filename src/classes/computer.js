/* eslint-disable no-restricted-syntax */
/* eslint-disable no-fallthrough */
import Player from './player';

export default class Computer extends Player {
  constructor() {
    super('Computer');
    this.search = { searching: false, coordinate: null };
  }

  #newSearch(searching = false, coordinate = null) {
    this.search = { searching, coordinate };
  }

  #setNextSearchDirection() {
    const searchDirections = ['above', 'below', 'left', 'right'];
    const currentIndex = searchDirections.indexOf(this.search.searching);
    const newIndex = currentIndex + 1;
    this.search.searching = searchDirections[newIndex];
  }

  #checkOtherShips() {
    const keys = Object.keys(this.opponentGameboard.board);
    for (const key of keys) {
      // if has been attacked and is not sunk return the coordinate
      if (
        this.opponentGameboard.board[key].attacked
        && this.opponentGameboard.board[key].shipPlaced
        && !this.opponentGameboard.board[key].shipPlaced.sunk
      ) {
        return key;
      }
    }
    return false;
  }

  randomAttack() {
    // if first move then use random coordinate
    if (!this.moves.length) return this.attack(this.#getRandCoordinate());
    // previous move is the last move in the this.moves list
    const previousMove = this.moves[this.moves.length - 1];
    // if not searching
    if (!this.search.searching) {
      // if ship is hit begin new search usimg previous coordinate, else attack random coordinate
      if (previousMove.coordinateData.shipPlaced) {
        this.#newSearch('above', previousMove.coordinate);
      } else return this.attack(this.#getRandCoordinate());
    }
    // if ship was sunk last move
    if (previousMove.coordinateData.shipPlaced.sunk) {
      const otherHits = this.#checkOtherShips();
      // if there are identified ships not sunk
      if (otherHits) this.#newSearch('above', otherHits);
      // if no queue start a blank new search and attack random target
      else {
        this.#newSearch();
        return this.attack(this.#getRandCoordinate());
      }
    }
    // search based on whether or not the previous search found anything
    if (
      previousMove.coordinateData.shipPlaced
      && !previousMove.coordinateData.shipPlaced.sunk
    ) {
      const nextCoordinate = this.#searchAround(previousMove.coordinate);
      return this.attack(nextCoordinate);
    }
    const nextCoordinate = this.#tryAgain(this.search.coordinate);
    return this.attack(nextCoordinate);
  }

  #tryAgain(coordinate) {
    this.#setNextSearchDirection();
    return this.#searchAround(coordinate);
  }

  #searchAround(searchCoordinate) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const [row, ...column] = searchCoordinate.split('');
    const rowIndex = letters.indexOf(row);

    let nextCoordinate;
    switch (this.search.searching) {
      case 'above': {
        nextCoordinate = `${letters[rowIndex - 1]}${column}`;
        if (
          Object.keys(this.opponentGameboard.board).includes(nextCoordinate)
          && !this.opponentGameboard.board[nextCoordinate].attacked
        ) {
          this.search.searching = 'above';
          return nextCoordinate;
        }
      }
      case 'below': {
        nextCoordinate = `${letters[rowIndex + 1]}${column}`;
        if (
          Object.keys(this.opponentGameboard.board).includes(nextCoordinate)
          && !this.opponentGameboard.board[nextCoordinate].attacked
        ) {
          this.search.searching = 'below';
          return nextCoordinate;
        }
      }
      case 'left': {
        nextCoordinate = `${row}${parseInt(column, 10) - 1}`;
        if (
          Object.keys(this.opponentGameboard.board).includes(nextCoordinate)
          && !this.opponentGameboard.board[nextCoordinate].attacked
        ) {
          this.search.searching = 'left';
          return nextCoordinate;
        }
      }
      case 'right': {
        nextCoordinate = `${row}${parseInt(column, 10) + 1}`;
        if (
          Object.keys(this.opponentGameboard.board).includes(nextCoordinate)
          && !this.opponentGameboard.board[nextCoordinate].attacked
        ) {
          this.search.searching = 'right';
          return nextCoordinate;
        }
      }
      default: {
        return this.search.coordinate === searchCoordinate
          ? this.#tryAgain(this.moves[this.moves.length - 1].coordinate)
          : this.#tryAgain(this.search.coordinate);
      }
    }
  }

  #getRandCoordinate() {
    let coordinate = false;
    while (!coordinate) {
      const keys = Object.keys(this.opponentGameboard.board);
      const randKey = Math.floor(keys.length * Math.random());
      const randomCoordinate = keys[randKey];
      if (!this.opponentGameboard.board[keys[randKey]].attacked) {
        coordinate = randomCoordinate;
      }
    }
    return coordinate;
  }
}
