const Player = (() => {
  const createPlayer = (playerName) => {
    const name = playerName;
    const getName = () => name;

    const previousAttacks = [];
    const getPreviousAttacks = () => previousAttacks;

    const takeTurn = (coords, opponentBoard) => {
      if (notInPrevious(coords)) {
        previousAttacks.push(coords);
        opponentBoard.receiveAttack(coords);
      }
    };

    const notInPrevious = (coords) => {
      const prev = JSON.stringify(previousAttacks);
      const curr = JSON.stringify(coords);
      return prev.indexOf(curr) === -1;
    };

    return {
      getName,
      getPreviousAttacks,
      takeTurn,
      notInPrevious,
    };
  };

  return createPlayer;
})();

export default Player;
