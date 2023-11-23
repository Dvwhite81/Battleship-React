import {
  getCoordsFromSquare,
  getSquareFromCoords,
  pieceWillFit,
  squaresAllEmpty,
} from './helpers';

const getValidVertical = (coords, length) => {
  const adj = [];
  const [x, y] = coords;
  if (pieceWillFit(x, length)) {
    for (let i = x; i < x + length; i++) {
      adj.push([i, y]);
    }
  }
  return adj;
};

const getValidHorizontal = (coords, length) => {
  const adj = [];
  const [x, y] = coords;
  if (pieceWillFit(y, length)) {
    for (let i = y; i < y + length; i++) {
      adj.push([x, i]);
    }
  }
  return adj;
};

const getAdjacentSquares = (e, piece) => {
  const square = e.target;
  const coords = getCoordsFromSquare(square);
  const type = piece.getAttribute('type');
  const length = parseInt(piece.getAttribute('length'), 10);
  const adjacent =
    type === 'vertical'
      ? getValidVertical(coords, length)
      : getValidHorizontal(coords, length);

  return getHoverSquares(adjacent);
};

const getHoverSquares = (adj) => {
  const squares = [];
  adj.forEach((a) => {
    const square = getSquareFromCoords(a);
    squares.push(square);
  });
  if (squaresAllEmpty(squares)) {
    return squares;
  }
  return [];
};

const addHover = (squares) => {
  const boardSquares = document.querySelectorAll(
    '#player-board .square',
  );
  boardSquares.forEach((square) =>
    square.classList.remove('active-hover'),
  );
  squares.forEach((square) => square.classList.add('active-hover'));
};

const removeHover = (squares) => {
  if (squares) {
    squares.forEach((square) =>
      square.classList.remove('active-hover'),
    );
  }
};

export {
  getValidVertical,
  getValidHorizontal,
  getAdjacentSquares,
  getHoverSquares,
  addHover,
  removeHover,
};
