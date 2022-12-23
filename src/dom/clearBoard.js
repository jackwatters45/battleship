/* eslint-disable no-param-reassign */
export default (leftBoard, rightBoard) => {
  const leftOverlay = document.querySelector('#left.overlay');
  const rightOverlay = document.querySelector('#right.overlay');

  rightOverlay.classList.add('hidden');
  leftOverlay.classList.add('hidden');

  leftBoard.innerHTML = '';
  rightBoard.innerHTML = '';
};
