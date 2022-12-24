import unhideShips from './unhideShips';
/* eslint-disable no-param-reassign */
export default (leftBoard, rightBoard) => {
  const leftOverlay = document.querySelector('#left.overlay');
  const rightOverlay = document.querySelector('#right.overlay');
  const shipContainer = document.querySelector('.ships-container');

  rightOverlay.classList.add('hidden');
  leftOverlay.classList.add('hidden');

  leftBoard.innerHTML = '';
  rightBoard.innerHTML = '';

  shipContainer.classList.remove('hidden');
  unhideShips();
};
