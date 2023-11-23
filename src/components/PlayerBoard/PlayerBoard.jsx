function PlayerBoard({ savedBoard }) {
  console.log('PlayerBoard savedBoard:', savedBoard);
  return (
    <div id="player-board" className="board">
      {savedBoard}
    </div>
  );
}

export default PlayerBoard;
