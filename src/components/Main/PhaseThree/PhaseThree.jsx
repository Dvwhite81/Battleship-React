import HelpButton from '../../Help/HelpButton';
import HelpModal from '../../Help/HelpModal';
import Message from '../../Message/Message';
import PlayerBoard from '../../PlayerBoard/PlayerBoard';
import ComputerBoard from '../../ComputerBoard/ComputerBoard';
import playGame from '../GameProcess';
import './PhaseThree.css';

function PhaseThree({
  setFalse,
  setTrue,
  attackMessageLeft,
  sunkMessageLeft,
  attackMessageRight,
  sunkMessageRight,
  player,
  playerBoard,
  bot,
  botBoard,
  savedBoard,
}) {
  playGame(setFalse, setTrue, player, playerBoard, bot, botBoard);
  return (
    <div id="phase-three-container">
      <HelpButton phase="three" />
      <HelpModal phase="three" />
      <Message
        side="left"
        attackMessage={attackMessageLeft}
        sunkMessage={sunkMessageLeft}
      />
      <Message
        side="right"
        attackMessage={attackMessageRight}
        sunkMessage={sunkMessageRight}
      />
      <div id="phase-three-boards">
        <PlayerBoard savedBoard={savedBoard} />
        <ComputerBoard />
      </div>
    </div>
  );
}

export default PhaseThree;
