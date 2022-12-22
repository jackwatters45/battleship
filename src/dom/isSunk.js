export default (ship, cell) => {
  const board = cell.parentElement.className;
  ship.coordinates.forEach((coordinate) => {
    const box = document.querySelector(`.${board}-box#${coordinate}`);
    box.style.backgroundColor = '#9b9494';
  });
};
