import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = this.#createGameboard();
    this.shipsPlaced = [];
    this._shipsToBePlaced = [
      { name: 'Carrier', length: 5 },
      { name: 'Battleship', length: 4 },
      { name: 'Cruiser', length: 3 },
      { name: 'Submarine', length: 3 },
      { name: 'Destroyer', length: 2 },
    ];
  }

  placeRandShips() {
    this._shipsToBePlaced.forEach((ship) => {
      const randomStart = Object.keys(this.board)[
        Math.floor(Math.random() * Object.keys(this.board).length)
      ];
      const randomOrientation = Math.random() < 0.5;

      this.placeShip(randomStart, randomOrientation, ship.length, ship.name);
    });
  }

  // Gameboards should be able to place ships at specific coordinates
  placeShip(start, orientation, length, name) {
    // gets array of coordinates using start orientation and length
    const coordinates = this.#getOtherCoordinates(start, orientation, length);
    // create new ship given coordinates
    const ship = new Ship(coordinates, name);
    // add ship to list of ships on gameboard
    this.shipsPlaced.push(ship);
    // for each coordinate
    coordinates.forEach((coordinate) => {
      // shipPlaced = true for each gameboard coordinate where ship is placed
      this.board[coordinate]['shipPlaced'] = ship;
    });
    // return the new ship object
    return ship;
  }

  // sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
  receiveAttack(coordinate) {
    // makes sure valid coordinate
    this.#checkAlreadyAttacked(coordinate);
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
    let [row, column] = start.split('');
    // convert column to int
    column = parseInt(column);
    // get index of row from letters array
    const rowIndex = letters.indexOf(row);

    // initalize coordinates as list with start of ship
    const coordinates = [start];

    if (isHorizontal)
      for (let i = column + 1; i < column + length; i++) {
        const newCoordinate = `${row}${i}`;
        this.#checkValidCoordinate(newCoordinate);
        coordinates.push(newCoordinate);
      }
    else
      for (let i = rowIndex + 1; i < rowIndex + length; i++) {
        const newCoordinate = `${letters[i]}${column}`;
        this.#checkValidCoordinate(newCoordinate);
        coordinates.push(newCoordinate);
      }
    return coordinates;
  }

  // TODO clean up these check methods
  // checks if coordinates are all on the board and not already taken
  #checkValidCoordinate(coordinate) {
    if (!Object.keys(this.board).includes(coordinate))
      throw `${coordinate}: Invalid Coordinate`;
    if (!(this.board[coordinate].shipPlaced === false))
      throw `${coordinate}: Already a ship there Captain`;
  }

  // TODO
  #checkAlreadyAttacked(coordinates) {
    if (!Object.keys(this.board).includes(coordinates))
      throw `${coordinates}: Invalid Coordinate`;
    if (!(this.board[coordinates].attacked === false))
      throw `${coordinates}: Already attacked there Captain`;
  }

  #allShipsSunk() {
    this.shipsPlaced.forEach((ship) => {
      if (!ship.sunk) return false;
    });
    return true;
  }
}
