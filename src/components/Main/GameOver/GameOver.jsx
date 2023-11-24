import './GameOver.css';

function GameOver({ setTrue, setFalse, winner }) {
  const name = winner.getName();
  const playAgain = () => {
    setTrue(true);
    setFalse(false);
  };
  const noThanks = () => setFalse(false);
  return (
    <div id="game-over-container">
      <h1>{name} Wins!</h1>
      <br />
      <h2>Want to play again?</h2>
      <div id="game-over-btns">
        <button id="play-again-btn" type="submit" onClick={playAgain}>
          Sure!
        </button>
        <button id="thank-you-btn" type="submit" onClick={noThanks}>
          No Thanks
        </button>
      </div>
    </div>
  );
}

export default GameOver;
