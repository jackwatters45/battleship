export default (attackResults, boxCoordinate) => {
  const box = document.querySelector(boxCoordinate);
  if (attackResults) {
    box.innerHTML = 'x';
    box.style.backgroundColor = '#F87171';
  } else {
    box.innerHTML = '•';
    box.style.backgroundColor = 'rgb(250, 248, 239, .5)';
  }
};
