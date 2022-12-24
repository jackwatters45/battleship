/* eslint-disable no-fallthrough */
import Player from './player';

export default class Computer extends Player {
  constructor() {
    super('Computer');
    this.search = { searching: false, coordinate: null };
  }

  randomAttack() {
    if (!this.moves.length) return this.attack(this.#getRandCoordinate());
    const previousMove = this.moves[this.moves.length - 1];
    if (!this.search.searching) {
      if (previousMove.coordinateData.shipPlaced) {
        this.#newSearch('above', previousMove.coordinate);
      } else return this.attack(this.#getRandCoordinate());
    }
    if (previousMove.coordinateData.shipPlaced.sunk) {
      const otherHits = this.#checkOtherShips();
      if (otherHits) this.#newSearch('above', otherHits);
      else {
        this.#newSearch();
        return this.attack(this.#getRandCoordinate());
      }
    }
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

  #getRandCoordinate() {
    const keys = Object.keys(this.opponentGameboard.board);
    const randomCoordinate = keys[Math.floor(keys.length * Math.random())];
    return this.opponentGameboard.board[randomCoordinate].attacked
      ? this.#getRandCoordinate()
      : randomCoordinate;
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
      default: { // TODO this is probably no bueno
        return this.search.coordinate === searchCoordinate
          ? this.#tryAgain(this.moves[this.moves.length - 1].coordinate)
          : this.#tryAgain(this.search.coordinate);
      }
    }
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
    return keys.find(
      (key) => this.opponentGameboard.board[key].attacked
        && this.opponentGameboard.board[key].shipPlaced
        && !this.opponentGameboard.board[key].shipPlaced.sunk,
    );
  }
}
