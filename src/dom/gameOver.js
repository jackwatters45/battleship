export default (player) => {
  const overlay = document.querySelectorAll('.overlay');
  let leftOverlay = overlay[0];
  let leftOverlayText = leftOverlay.firstElementChild;

  let rightOverlay = overlay[1];
  let rightOverlayText = rightOverlay.firstElementChild;

  leftOverlayText.textContent = `Gameover!`;
  rightOverlayText.textContent = ` ${player.name} wins!`;

  leftOverlay.classList.remove('hidden');
  rightOverlay.classList.remove('hidden');

  // return false so that if the player wins the cpu's turn is not triggered
  return false;
};