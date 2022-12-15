export default class Ship {
  constructor(length, coordinates) {
    this.length = length;
    this.hits = 0;
    this.coordinates = coordinates;
    this.sunk = false
    this.name;
  }
  
  hit() {
    this.hits += 1;
    return this.#isSunk()
  }

  #isSunk() {
    if(this.hits === this.length) return this.sunk = true
  }
}
