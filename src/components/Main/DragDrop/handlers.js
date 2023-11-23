import {
  squaresAllEmpty,
  getValidSquares,
  placePieceOnSquares,
  targetIsSquare,
} from './helpers';
import { getAdjacentSquares, addHover, removeHover } from './hover';
import {
  removePieceListeners,
  addSquareListeners,
  removeSquareListeners,
} from './listeners';

const handleDragStart = (e) => {
  const piece = e.target;
  e.dataTransfer.setData('text', piece.id);
  const validSquares = getValidSquares(piece);
  addSquareListeners(piece, validSquares);
};

const handleDragEnter = (e, piece) => {
  e.preventDefault();
  if (targetIsSquare(e.target) && piece) {
    const adj = getAdjacentSquares(e, piece);
    if (squaresAllEmpty(adj)) {
      addHover(adj);
    }
  }
};

const handleDragLeave = (e) => {
  const board = document.querySelector('#player-board');
  const boardSquares = document.querySelectorAll('.square');
  if (e.relatedTarget.parentElement !== board) {
    removeHover(boardSquares);
  }
};

const handleDragOver = (e) => {
  e.preventDefault();
  return false;
};

const handleDrop = (e, piece) => {
  if (piece) {
    removePieceListeners(piece);
  }
  const square = e.target;
  const squares = document.querySelectorAll('.active-hover');
  removeHover(squares);
  const id = e.dataTransfer.getData('text');
  const ship = document.getElementById(id);
  placePieceOnSquares(e, square, ship);
  e.dataTransfer.clearData();
  removeSquareListeners();
};

export {
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
};
