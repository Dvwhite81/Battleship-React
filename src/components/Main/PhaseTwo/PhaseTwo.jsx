import { useState } from 'react';
import HelpButton from '../../Help/HelpButton';
import HelpModal from '../../Help/HelpModal';
import PieceContainer from '../../PieceContainer/PieceContainer';
import Board from '../../Board/Board';
import './PhaseTwo.css';

function PhaseTwo({
  setFalse,
  setTrue,
  board,
  setPlayerBoard,
  setSavedBoard,
}) {
  const [piece, setPiece] = useState(null);
  const [count, setCount] = useState(0);
  const [isError, setIsError] = useState(false);

  return (
    <div id="phase-two-container">
      <HelpButton phase="two" />
      <HelpModal
        phase="two"
        isError={isError}
        setIsError={setIsError}
      />
      <PieceContainer side="left" setPiece={setPiece} />
      <Board
        piece={piece}
        setPiece={setPiece}
        count={count}
        setCount={setCount}
        setIsError={setIsError}
        board={board}
        setPlayerBoard={setPlayerBoard}
        setSavedBoard={setSavedBoard}
        setFalse={setFalse}
        setTrue={setTrue}
      />
      <PieceContainer side="right" setPiece={setPiece} />
    </div>
  );
}

export default PhaseTwo;
