import {
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
} from './handlers';

const removePieceListeners = (piece) => {
  piece.draggable = false;
  piece.removeEventListener('dragstart', handleDragStart);
};

const addSquareListeners = (piece, validSquares) => {
  validSquares.forEach((square) => {
    square.addEventListener('dragover', handleDragOver);
    square.addEventListener('dragenter', (e) =>
      handleDragEnter(e, piece),
    );
    square.addEventListener('dragleave', handleDragLeave);
  });
};

const removeSquareListeners = () => {
  const boardSquares = document.querySelectorAll(
    '#player-board .square',
  );
  boardSquares.forEach((square) => {
    square.removeEventListener('dragover', handleDragOver);
    square.removeEventListener('dragenter', handleDragEnter);
    square.removeEventListener('dragleave', handleDragLeave);
    square.removeEventListener('drop', handleDrop);
  });
};

export {
  removePieceListeners,
  addSquareListeners,
  removeSquareListeners,
};
