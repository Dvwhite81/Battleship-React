import {
  getValidVertical,
  getValidHorizontal,
  getHoverSquares,
  getAdjacentSquares,
} from './hover';

const targetIsSquare = (target) => {
  return (
    target.tagName === 'DIV' && target.classList.contains('square')
  );
};

const squareIsEmpty = (target) => {
  return targetIsSquare(target) && target.children.length === 0;
};

const squaresAllEmpty = (squares) => {
  return squares.every((square) => squareIsEmpty(square));
};

const getSquareFromCoords = (a) => {
  const [x, y] = a;
  return document.querySelector(`[coords="${x}, ${y}"]`);
};

const pieceWillFit = (start, length) => {
  return start + length <= 10;
};

const placePieceOnSquares = (e, square, piece) => {
  if (piece !== null) {
    const adj = getAdjacentSquares(e, piece);
    const shipSquares = Array.from(piece.childNodes);
    if (adj) {
      adj.forEach((adjSquare, index) => {
        if (shipSquares[index] !== undefined) {
          adjSquare.append(shipSquares[index]);
        }
      });
      placeImageOnTarget(square, piece);
    }
  }
};

const getPieceInfo = (piece) => {
  const id = piece.getAttribute('id');
  const shipName = id.split('-')[1];
  const type = piece.getAttribute('type');
  const className = `${type}-img ${id}-img`;
  const url = piece.getAttribute('img');
  const img = document.createElement('img');
  img.className = className;
  img.src = url;
  return { img, shipName, type };
};

const placeImageOnTarget = (square, piece) => {
  const { img, shipName, type } = getPieceInfo(piece);
  square.append(img);
  const opposite =
    type === 'vertical'
      ? document.getElementById(`horizontal-${shipName}`)
      : document.getElementById(`vertical-${shipName}`);

  piece.remove();
  opposite.remove();
};

const getCoordsFromSquare = (square) => {
  const x = square.getAttribute('x');
  const y = square.getAttribute('y');
  return [Number(x), Number(y)];
};

const getValidSquares = (piece) => {
  const valid = [];
  const type = piece.getAttribute('type');
  const length = parseInt(piece.getAttribute('length'), 10);
  const boardSquares = document.querySelectorAll(
    '#player-board .square',
  );

  boardSquares.forEach((square) => {
    const coords = getCoordsFromSquare(square);

    const adjacentCoords =
      type === 'vertical'
        ? getValidVertical(coords, length)
        : getValidHorizontal(coords, length);

    const adjacentSquares = getHoverSquares(adjacentCoords);
    if (adjacentSquares.length && squaresAllEmpty(adjacentSquares)) {
      valid.push(square);
    }
  });
  return valid;
};

export {
  targetIsSquare,
  squareIsEmpty,
  squaresAllEmpty,
  getSquareFromCoords,
  pieceWillFit,
  placePieceOnSquares,
  getCoordsFromSquare,
  getValidSquares,
};
