import Square from '../Square/Square';
import './Board.css';

function Board({
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
  const squares = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const square = (
        <Square
          key={[x, y]}
          x={x}
          y={y}
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
      );
      squares.push(square);
    }
  }
  return (
    <div id="player-board" className="board">
      {squares}
    </div>
  );
}

export default Board;
