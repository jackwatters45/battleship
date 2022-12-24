export default () => {
  const leftOverlay = document.querySelector('#left.overlay');
  const rightOverlay = document.querySelector('#right.overlay');
  const leftBoard = document.querySelector('.left-board');
  const rightBoard = document.querySelector('.right-board');
  const shipContainer = document.querySelector('.ships-container');
  const carrier = document.querySelector('#carrier');
  const battleship = document.querySelector('#battleship');
  const cruiser = document.querySelector('#cruiser');
  const submarine = document.querySelector('#submarine');
  const destoyer = document.querySelector('#destroyer');

  rightOverlay.classList.add('hidden');
  leftOverlay.classList.add('hidden');
  leftBoard.innerHTML = '';
  rightBoard.innerHTML = '';
  shipContainer.classList.remove('hidden');
  carrier.classList.remove('hidden');
  battleship.classList.remove('hidden');
  cruiser.classList.remove('hidden');
  submarine.classList.remove('hidden');
  destoyer.classList.remove('hidden');
};
