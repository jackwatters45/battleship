export default () => {
  const carrier = document.querySelector('#carrier');
  const battleship = document.querySelector('#battleship');
  const cruiser = document.querySelector('#cruiser');
  const submarine = document.querySelector('#submarine');
  const destoyer = document.querySelector('#destroyer');

  carrier.classList.remove('hidden');
  battleship.classList.remove('hidden');
  cruiser.classList.remove('hidden');
  submarine.classList.remove('hidden');
  destoyer.classList.remove('hidden');
};
