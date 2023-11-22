const Player = (() => {
  const createPlayer = (playerName) => {
    const name = playerName;
    const getName = () => name;

    const previousAttacks = [];
    const getPreviousAttacks = () => previousAttacks;

    const takeTurn = (coords, opponentBoard) => {
      if (!previousAttacks.includes(coords)) {
        previousAttacks.push(coords);
        opponentBoard.receiveAttack(coords);
      }
    };

    return {
      getName,
      getPreviousAttacks,
      takeTurn,
    };
  };

  return createPlayer;
})();

export default Player;
