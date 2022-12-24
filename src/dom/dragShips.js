export const dragStart = (e) => {
  // get the distance of the click from left and top of the ships
  const x = e.pageX - e.currentTarget.offsetLeft;
  const y = e.pageY - e.currentTarget.offsetTop;

  // get orientation
  const isHorizontal = !!e.target.classList[1];

  // calculate which cell of the ship was clicked and calculate the start cell
  let draggedCell = isHorizontal ? x / 36.5 : y / 36.5;
  draggedCell = Math.floor(draggedCell);

  // transfer data to drop
  const data = { id: e.target.id, isHorizontal, draggedCell };
  e.dataTransfer.setData('text/plain', JSON.stringify(data));
};

const calculateEndPoints = (isHorizontal, cell, targetBox, length) => {
  // organize drop data
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  let [startRow, ...startColumn] = targetBox;
  startColumn = parseInt(startColumn.join(''), 10);
  let rowIndex = letters.indexOf(startRow);

  // get start
  if (isHorizontal) startColumn -= cell;
  else startRow = letters[(rowIndex -= cell)];

  const start = letters.includes(startRow) && startColumn >= 1 && startColumn <= 10
    ? `${startRow}${startColumn}`
    : false;

  // get end
  let endColumn;
  let endRow;
  if (isHorizontal) {
    endColumn = startColumn + length - 1;
    endRow = startRow;
  } else {
    endRow = letters[rowIndex + length - 1];
    endColumn = startColumn;
  }
  const end = letters.includes(endRow) && endColumn >= 1 && endColumn <= 10
    ? `${endRow}${endColumn}`
    : false;

  // return start and end
  return [start, end];
};

export const drop = (e) => {
  // get drag and drop data
  const targetBox = e.target.id;
  const data = JSON.parse(e.dataTransfer.getData('text/plain'));
  const ship = document.querySelector(`#${data.id}`);
  const length = ship.childElementCount;

  // calculate start and end points of ship
  const [start, end] = calculateEndPoints(
    data.isHorizontal,
    data.draggedCell,
    targetBox,
    length,
  );

  // return if either endpoint is not valid
  if (!start || !end) return undefined;

  return {
    start,
    isHorizontal: data.isHorizontal,
    length,
    name: data.id.charAt(0).toUpperCase() + data.id.slice(1),
    ship,
  };
};
