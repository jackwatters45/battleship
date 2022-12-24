/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
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
    shipsToBePlaced.forEach((ship) => {
      let isValidShip = false;
      let coordinates;

      while (!isValidShip) {
        const randStart = Object.keys(this.board)[
          Math.floor(Math.random() * Object.keys(this.board).length)
        ];
        const randOrientation = Math.random() < 0.5;

        coordinates = this.#getOtherCoordinates(
          randStart,
          randOrientation,
          ship.length,
        );
        if (Array.isArray(coordinates)) {
          isValidShip = true;
        }
      }
      this.#placeShip(coordinates, ship.name);
    });
    this._shipsToBePlaced = null;
  }

  userPlaceShip(start, orientation, length, name) {
    this.#placeShip(
      this.#getOtherCoordinates(start, orientation, length),
      name,
    );
  }

  // Gameboards should be able to place ships at specific coordinates
  #placeShip(coordinates, name) {
    // create new ship given coordinates
    const ship = new Ship(coordinates, name);
    // add ship to list of ships on gameboard
    this.shipsPlaced.push(ship);
    // for each coordinate
    coordinates.forEach((coordinate) => {
      // shipPlaced = true for each gameboard coordinate where ship is placed
      this.board[coordinate].shipPlaced = ship;
    });
    // return the new ship object
    return ship;
  }

  // sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
  receiveAttack(coordinate) {
    // record that these coordinates have been attacked
    this.board[coordinate].attacked = true;
    // if ship at location it is hit
    if (this.board[coordinate].shipPlaced) {
      // if ship is sunk check for end of game
      this.board[coordinate].shipPlaced.hit();
      // return ship
      return this.board[coordinate].shipPlaced;
    }
    return false;
  }

  // create 10 x 10 gameboard grid -> Row = Letter and column = number
  #createGameboard() {
    const newGameboard = {};
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    letters.forEach((letter) => {
      for (let i = 1; i <= 10; i += 1) {
        newGameboard[`${letter}${i}`] = {
          shipPlaced: false,
          attacked: false,
        };
      }
    });
    return newGameboard;
  }

  #getOtherCoordinates(start, isHorizontal, length) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    // get row and column from coordinate string
    const [row, ...columnArr] = start.split('');
    // convert column to int
    const column = parseInt(
      columnArr.reduce((numString1, numString2) => numString1 + numString2),
      10,
    );
    // get index of row from letters array
    const rowIndex = letters.indexOf(row);
    // initalize coordinates list
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

  // checks if coordinates are all on the board and not already taken
  #isValidCoordinate(coordinate) {
    return (
      Object.keys(this.board).includes(coordinate)
      && this.board[coordinate].shipPlaced === false
    );
  }

  isAlreadyAttacked(coordinate) {
    return this.board[coordinate].attacked;
  }

  allShipsSunk() {
    let gameOver = true;
    this.shipsPlaced.forEach((ship) => {
      if (!ship.sunk) gameOver = false;
    });
    return gameOver;
  }
}
