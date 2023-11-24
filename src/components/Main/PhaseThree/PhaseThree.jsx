import { useState } from 'react';
import HelpButton from '../../Help/HelpButton';
import HelpModal, { openModal } from '../../Help/HelpModal';
import Message from '../../Message/Message';
import PlayerBoard from '../../PlayerBoard/PlayerBoard';
import ComputerBoard from '../../ComputerBoard/ComputerBoard';
import {
  getInfo,
  getBotInfo,
  placeHitOrMiss,
  changeMessage,
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
  const [isError, setIsError] = useState(false);
  const [turn, setTurn] = useState(true);

  if (gameOver) {
    setTrue(true);
    setFalse(false);
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!turn || gameOver) {
      return;
    }
    const { target } = e;
    const { coords, square, isEmpty } = getInfo(target, botBoard);
    const ship = square.shipName;

    if (notValidClick(target, coords)) {
      setIsError(true);
      openModal('three');
    } else {
      playerTakeTurn(coords, isEmpty, ship);
      if (gameOver) {
        return;
      }
      setTimeout(() => {
        botTakeTurn();
      }, 1000);
    }
  };

  const notValidClick = (target, coords) => {
    return (
      !player.notInPrevious(coords) ||
      !target.classList.contains('square')
    );
  };

  const playerTakeTurn = (coords, isEmpty, ship) => {
    player.takeTurn(coords, botBoard);
    showAttack(coords, '#computer-board', isEmpty);
    handleAttack(true, isEmpty, ship, botBoard);
    setTurn(false);
  };

  const botTakeTurn = () => {
    if (gameOver) {
      return;
    }
    bot.attack(playerBoard);
    const { coords, square, isEmpty } = getBotInfo(bot, playerBoard);
    const ship = square.shipName;
    showAttack(coords, '#player-board', isEmpty);
    handleAttack(false, isEmpty, ship, playerBoard);
    setTurn(true);
  };

  const showAttack = (coords, domBoard, isEmpty) => {
    if (gameOver) return;
    const [x, y] = coords;
    placeHitOrMiss(domBoard, x, y, isEmpty);
  };

  const handleAttack = (isPlayer, isEmpty, ship, board) => {
    if (isEmpty) {
      handleMiss(isPlayer);
    } else {
      handleHit(isPlayer, ship, board);
    }
  };

  const handleMiss = (isPlayer) => {
    if (isPlayer) {
      changeMessage(setAttackMessageRight, 'You Missed!');
    } else {
      changeMessage(setAttackMessageLeft, 'Computer Missed!');
    }
  };

  const handleHit = (isPlayer, ship, board) => {
    const shipName = ship.split('-')[1];
    if (isPlayer) {
      changeMessage(
        setAttackMessageRight,
        `You hit the ${shipName}!`,
      );
    } else {
      changeMessage(
        setAttackMessageLeft,
        `Computer hit your ${shipName}!`,
      );
    }
    const currentShip = getCurrentShip(ship, board);
    if (currentShip.isSunk()) {
      handleSunk(isPlayer, ship, board);
    }
  };

  const getCurrentShip = (ship, board) => {
    const boardShips = board.getShips();
    let currentShip;
    boardShips.forEach((eachShip) => {
      if (eachShip.getName() === ship) {
        currentShip = eachShip;
      }
    });
    return currentShip;
  };

  const handleSunk = (isPlayer, ship, board) => {
    const shipName = ship.split('-')[1];
    if (isPlayer) {
      changeMessage(setSunkMessageRight, `You sank the ${shipName}!`);
      setTimeout(() => {
        changeMessage(setSunkMessageRight, '');
      }, 2000);
    } else {
      changeMessage(
        setSunkMessageLeft,
        `Computer sank your ${shipName}!`,
      );
      setTimeout(() => {
        changeMessage(setSunkMessageLeft, '');
      }, 2000);
    }

    if (board.allShipsSunk()) {
      setWinner(isPlayer ? player : bot);
      setGameOver(true);
    }
  };

  return (
    <div id="phase-three-container">
      <HelpButton phase="three" />
      <HelpModal
        phase="three"
        isError={isError}
        setIsError={setIsError}
      />
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
