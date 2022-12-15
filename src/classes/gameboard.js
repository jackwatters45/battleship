import Ship from './ship';

export default class Gameboard {
  // Create board array
  constructor() {
    this.board = this.#createGameboard();
    this.ships = [];
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

  // Gameboards should be able to place ships at specific coordinates
  placeShip([...coordinates]) {
    // check if valid coordinates
    this.checkValidCoordinate(coordinates);
    // create new ship given coordinates
    const ship = new Ship(coordinates.length, coordinates);
    // add ship to list of ships on gameboard
    this.ships.push(ship);
    // for each coordinate
    coordinates.forEach((coordinate) => {
      // shipPlaced = true for each gameboard coordinate where ship is placed
      this.board[coordinate]['shipPlaced'] = ship;
    });
    // return the new ship object
    return ship;
  }

  // TODO clean up these check methods
  // checks if coordinates are all on the board and not already taken
  checkValidCoordinate(coordinates) {
    if (Array.isArray(coordinates)) {
      coordinates.forEach((coordinate) => {
        if (!Object.keys(this.board).includes(coordinate))
          throw `${coordinate}: Invalid Coordinate`;
        if (!(this.board[coordinate].shipPlaced === false))
          throw `${coordinate}: Already a ship there Captain`;
      });
    } else {
      if (!Object.keys(this.board).includes(coordinates))
        throw `${coordinates}: Invalid Coordinate`;
      if (!(this.board[coordinates].shipPlaced === false))
        throw `${coordinates}: Already a ship there Captain`;
    }
  }

  checkAlreadyAttacked(coordinates) {
    if (Array.isArray(coordinates)) {
      coordinates.forEach((coordinate) => {
        if (!Object.keys(this.board).includes(coordinate))
          throw `${coordinate}: Invalid Coordinate`;
        if (!(this.board[coordinate].attacked === false))
          throw `${coordinate}: Already attacked there Captain`;
      });
    } else {
      if (!Object.keys(this.board).includes(coordinates))
        throw `${coordinates}: Invalid Coordinate`;
      if (!(this.board[coordinates].attacked === false))
        throw `${coordinates}: Already attacked there Captain`;
    }
  }

  // sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
  receiveAttack(coordinate) {
    // makes sure valid coordinate
    this.checkAlreadyAttacked(coordinate);
    // if ship at location it is hit
    if (this.board[coordinate].shipPlaced) {
      // that ship is sunk
      if (this.board[coordinate].shipPlaced.hit()) {
        // check for end of game
        return this.#allShipsSunk();
      }
    }
    // record that these coordinates have been attacked
    this.board[coordinate].attacked = true;
  }

  #allShipsSunk() {
    this.ships.forEach((ship) => {
      if (!ship.sunk) return false;
    });
    return true;
  }
}
