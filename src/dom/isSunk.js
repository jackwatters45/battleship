// turns cells grey when a ship is sunk
export default (ship, cell) => {
  const board = cell.parentElement.className;
  ship.coordinates.forEach((coordinate) => {
    document.querySelector(`.${board}-box#${coordinate}`).style.backgroundColor = '#9b9494';
  });
};
