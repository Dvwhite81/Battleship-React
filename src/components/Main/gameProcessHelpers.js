const getBoardCoords = (target) => {
  const x = Number(target.getAttribute('x'));
  const y = Number(target.getAttribute('y'));
  return [x, y];
};

const getSquare = (coords, board) => {
  const square = board.getSpace(coords);
  return square;
};

const getInfo = (target, board) => {
  const coords = getBoardCoords(target);
  const square = getSquare(coords, board);
  const isEmpty = square.empty === true;

  return {
    coords,
    square,
    isEmpty,
  };
};

const getBotInfo = (bot, playerBoard) => {
  const prevAttacks = bot.getPreviousAttacks();
  const { length } = prevAttacks;
  const coords = prevAttacks[length - 1];
  const square = getSquare(coords, playerBoard);
  const isEmpty = square.empty === true;

  return {
    coords,
    square,
    isEmpty,
  };
};

const placeHitOrMiss = (board, x, y, isEmpty) => {
  const classToAdd = isEmpty === true ? 'miss' : 'hit';
  const hitOrMiss = document.createElement('div');
  hitOrMiss.className = classToAdd;
  const square = document.querySelector(
    `${board} [coords="${x}, ${y}"]`,
  );
  if (square) {
    square.append(hitOrMiss);
  }
};

const changeMessage = (type, message) => {
  type(message);
};

export { getInfo, getBotInfo, placeHitOrMiss, changeMessage };
