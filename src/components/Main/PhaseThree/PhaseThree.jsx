import { useState } from 'react';
import HelpButton from '../../Help/HelpButton';
import HelpModal from '../../Help/HelpModal';
import Message from '../../Message/Message';
import PlayerBoard from '../../PlayerBoard/PlayerBoard';
import ComputerBoard from '../../ComputerBoard/ComputerBoard';
import {
  getInfo,
  applyAttack,
  botAttack,
} from '../gameProcessHelpers';
import './PhaseThree.css';

function PhaseThree({
  setFalse,
  setTrue,
  setWinner,
  player,
  playerBoard,
  bot,
  botBoard,
  savedBoard,
}) {
  const [gameOver, setGameOver] = useState(false);
  const [attackMessageLeft, setAttackMessageLeft] = useState('');
  const [sunkMessageLeft, setSunkMessageLeft] = useState('');
  const [attackMessageRight, setAttackMessageRight] = useState('');
  const [sunkMessageRight, setSunkMessageRight] = useState('');
  const [playerTurn, setPlayerTurn] = useState(true);

  if (gameOver) {
    console.log('PhaseThree gameOver');
    setTrue(true);
    setFalse(false);
    setWinner();
  }

  const handleClick = (e) => {
    console.log('handleClick');
    e.preventDefault();
    const { target } = e;
    const { coords, square, isEmpty } = getInfo(target, botBoard);
    applyAttack(
      '#computer-board',
      botBoard,
      coords,
      square,
      isEmpty,
      setAttackMessageRight,
      setSunkMessageRight,
      setGameOver,
      true,
    );
    /*
    botAttack(
      bot,
      playerBoard,
      setAttackMessageLeft,
      setSunkMessageLeft,
      setGameOver,
    );
    */
  };

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
        <ComputerBoard handleClick={handleClick} />
      </div>
    </div>
  );
}

export default PhaseThree;
