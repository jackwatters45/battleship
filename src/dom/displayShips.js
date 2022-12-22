const getShipColor = (shipName) => {
  const colors = {
    Carrier: '#edd073',
    Battleship: '#f75f3b',
    Cruiser: '#f77c5f',
    Submarine: '#f69664',
    Destroyer: '#f3b27a',
  };
  return colors[shipName];
};

export default (shipsPlaced, board) => {
  shipsPlaced.forEach((ship) => {
    const shipColor = getShipColor(ship.name);
    ship.coordinates.forEach((coordinate) => {
      const cell = document.querySelector(`.${board.className} #${coordinate}`);
      cell.style.backgroundColor = shipColor;
      cell.style.border = 'solid 1px #776e65';
      cell.classList.add(ship.name);
    });
  });
};
