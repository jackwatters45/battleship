export default () => {
  const shipContainer = document.querySelector('.ships');
  shipContainer.classList.toggle('vertical-orientation');
  const ships = document.querySelectorAll('.ship');
  ships.forEach((ship) => ship.classList.toggle('horizontal'));
};
