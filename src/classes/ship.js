export default class Ship {
  constructor(coordinates, name = undefined) {
    this.hits = 0;
    this.coordinates = coordinates;
    this.length = coordinates.length;
    this.sunk = false;
    this.name = name;
  }

  hit() {
    this.hits += 1;
    return this.#isSunk();
  }

  #isSunk() {
    if (this.hits === this.length) return (this.sunk = true);
  }
}
