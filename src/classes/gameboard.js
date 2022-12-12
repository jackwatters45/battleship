export default class Gameboard {
  // Create board array
  constructor() {
    this.gameboard = this.#createGameboard();
  }

  // create 10 x 10 gameboard grid
  #createGameboard() {
    const newGameboard = {};
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    letters.forEach((letter) => {
      for (let i = 1; i <= 10; i += 1) {
        newGameboard[`${letter}${i}`] = {};
        // eventually add properties inside above
      }
    });
    return newGameboard;
  }

  // Gameboards should be able to place ships at specific coordinates
  placeShip() {}

  // takes a pair of coordinates
  // determines whether or not the attack hit a ship
  // sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
  receiveAttack() {}

  // Gameboards should keep track of missed attacks so they can display them properly.

  // Gameboards should be able to report whether or not all of their ships have been sunk.
}
