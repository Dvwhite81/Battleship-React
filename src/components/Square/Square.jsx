import {
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
} from '../Main/DragDrop/handlers';
import {
  squareIsEmpty,
  squaresAllEmpty,
} from '../Main/DragDrop/helpers';
import { getAdjacentSquares } from '../Main/DragDrop/hover';
import { openModal } from '../Help/HelpModal';
import { createShip, savedBoard } from './squareHelpers';
import './Square.css';

function Square({
  x,
  y,
  piece,
  setPiece,
  count,
  setCount,
  setIsError,
  board,
  setPlayerBoard,
  setSavedBoard,
  setFalse,
  setTrue,
}) {
  const handlePieceDrop = (e) => {
    e.preventDefault();

    const adj = getAdjacentSquares(e, piece);
    if (
      squareIsEmpty(e.target) &&
      adj.length &&
      squaresAllEmpty(adj)
    ) {
      handleDrop(e, piece);
      const ship = createShip(e, piece);
      board.placeShip(ship);
      setCount((count += 1));
      setPiece(null);

      if (count > 4) {
        setPlayerBoard(board);
        const savedHtmlBoard = savedBoard();
        setSavedBoard(savedHtmlBoard);
        setTrue(true);
        setFalse(false);
      }
    } else {
      setIsError(true);
      openModal('two');
    }
  };

  return (
    <div
      className="square"
      coords={`${x}, ${y}`}
      x={x}
      y={y}
      onDragEnter={(e) => handleDragEnter(e, piece)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handlePieceDrop}
    />
  );
}

export default Square;
