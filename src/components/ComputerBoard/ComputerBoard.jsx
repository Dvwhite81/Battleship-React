import makeEmptySquares from './computerBoardHelpers';

function ComputerBoard({ handleClick }) {
  const squares = makeEmptySquares(handleClick);
  return (
    <div id="computer-board" className="board">
      {squares}
    </div>
  );
}

export default ComputerBoard;
