/* eslint-disable class-methods-use-this */
import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = this.#createGameboard();
    this.shipsPlaced = [];
  }

  placeRandShips() {
    const shipsToBePlaced = [
      { name: 'Carrier', length: 5 },
      { name: 'Battleship', length: 4 },
      { name: 'Cruiser', length: 3 },
      { name: 'Submarine', length: 3 },
      { name: 'Destroyer', length: 2 },
    ];
    shipsToBePlaced.forEach((ship) => this.#placeShip(this.#getRandCoordinates(ship), ship.name));
  }

  userPlaceShip(start, orientation, length, name) {
    const coordinates = this.#getOtherCoordinates(start, orientation, length);
    return coordinates ? this.#placeShip(coordinates, name) : false;
  }

  receiveAttack(coordinate) {
    this.board[coordinate].attacked = true;
    if (this.board[coordinate].shipPlaced) this.board[coordinate].shipPlaced.hit();
    return this.board[coordinate].shipPlaced;
  }

  isAlreadyAttacked(coordinate) {
    return this.board[coordinate].attacked;
  }

  allShipsSunk() {
    return !this.shipsPlaced.find((ship) => !ship.sunk);
  }

  #getRandCoordinates(ship) {
    const randStart = Object.keys(this.board)[
      Math.floor(Math.random() * Object.keys(this.board).length)
    ];
    const randOrientation = Math.random() < 0.5;
    const coordinates = this.#getOtherCoordinates(
      randStart,
      randOrientation,
      ship.length,
    );
    return coordinates || this.#getRandCoordinates(ship);
  }

  #placeShip(coordinates, name) {
    const ship = new Ship(coordinates, name);
    coordinates.forEach((coordinate) => {
      this.board[coordinate].shipPlaced = ship;
    });
    this.shipsPlaced.push(ship);
    return ship;
  }

  #createGameboard() {
    const gameboard = {};
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    letters.forEach((letter) => {
      for (let i = 1; i <= 10; i += 1) {
        gameboard[`${letter}${i}`] = { shipPlaced: false, attacked: false };
      }
    });
    return gameboard;
  }

  #getOtherCoordinates(start, isHorizontal, length) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const [row, ...columnArr] = start.split('');
    const column = parseInt(columnArr.reduce((numStr1, numStr2) => numStr1 + numStr2), 10);
    const rowIndex = letters.indexOf(row);
    const coordinates = [];
    if (isHorizontal) {
      for (let i = column; i < column + length; i += 1) {
        const newCoordinate = `${row}${i}`;
        if (!this.#isValidCoordinate(newCoordinate)) return false;
        coordinates.push(newCoordinate);
      }
    } else {
      for (let i = rowIndex; i < rowIndex + length; i += 1) {
        const newCoordinate = `${letters[i]}${column}`;
        if (!this.#isValidCoordinate(newCoordinate)) return false;
        coordinates.push(newCoordinate);
      }
    }
    return coordinates;
  }

  #isValidCoordinate(coordinate) {
    return (
      Object.keys(this.board).includes(coordinate)
      && this.board[coordinate].shipPlaced === false
    );
  }
}
