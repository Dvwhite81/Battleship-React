import PlayerBoard from '../../PlayerBoard/PlayerBoard';
import './PhaseThree.css';

function PhaseThree({
  setFalse,
  setTrue,
  player,
  playerBoard,
  bot,
  botBoard,
  savedBoard,
}) {
  console.log('phasethree player.getName():', player.getName());
  return (
    <div id="phase-three-container">
      <PlayerBoard savedBoard={savedBoard} />
    </div>
  );
}

export default PhaseThree;
