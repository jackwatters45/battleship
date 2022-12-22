export default (player) => {
  const overlay = document.querySelectorAll('.overlay');
  const leftOverlay = overlay[0];
  const leftOverlayText = leftOverlay.firstElementChild;

  const rightOverlay = overlay[1];
  const rightOverlayText = rightOverlay.firstElementChild;

  leftOverlayText.textContent = 'Gameover!';
  rightOverlayText.textContent = ` ${player.name} wins!`;

  leftOverlay.classList.remove('hidden');
  rightOverlay.classList.remove('hidden');

  // return false so that if the player wins the cpu's turn is not triggered
  return false;
};
