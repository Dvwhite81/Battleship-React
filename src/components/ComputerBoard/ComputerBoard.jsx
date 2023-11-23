import makeEmptySquares from './computerBoardHelpers';

function ComputerBoard() {
  const squares = makeEmptySquares();
  return (
    <div id="computer-board" className="board">
      {squares}
    </div>
  );
}

export default ComputerBoard;
