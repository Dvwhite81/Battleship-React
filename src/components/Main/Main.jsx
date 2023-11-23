import { useState } from 'react';
import PhaseOne from './PhaseOne/PhaseOne';
import PhaseTwo from './PhaseTwo/PhaseTwo';
import PhaseThree from './PhaseThree/PhaseThree';
import PhaseFour from './PhaseFour/PhaseFour';
import GameOver from './GameOver/GameOver';
import Thanks from './Thanks/Thanks';
import Player from '../../scripts/Factories/Player';
import Gameboard from '../../scripts/Factories/Gameboard';
import Computer from '../../scripts/Factories/Computer';

function Main() {
  const [isPhaseOne, setIsPhaseOne] = useState(true);
  const [isPhaseTwo, setIsPhaseTwo] = useState(false);
  const [isPhaseThree, setIsPhaseThree] = useState(false);
  const [isPhaseFour, setIsPhaseFour] = useState(false);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [playerName, setPlayerName] = useState('Captain');

  const player = Player(playerName);
  const playerBoard = Gameboard();
  const bot = Computer();
  const botBoard = Gameboard();
  const botShips = bot.makeAllShips();
  botBoard.placeAllShips(botShips);

  const renderPhase = () => {
    console.log('renderPhase');
    if (isPhaseOne) {
      console.log('isPhaseOne');
      return (
        <PhaseOne
          setFalse={setIsPhaseOne}
          setTrue={setIsPhaseTwo}
          setPlayerName={setPlayerName}
        />
      );
    }
    if (isPhaseTwo) {
      console.log('isPhaseTwo');
      return (
        <PhaseTwo
          setFalse={setIsPhaseTwo}
          setTrue={setIsPhaseThree}
          playerBoard={playerBoard}
          player={player}
          playerName={playerName}
        />
      );
    }
    if (isPhaseThree)
      return (
        <PhaseThree
          setFalse={setIsPhaseThree}
          setTrue={setIsPhaseFour}
          player={player}
          playerBoard={playerBoard}
          bot={bot}
          botBoard={botBoard}
        />
      );
    if (isPhaseFour)
      return (
        <PhaseFour
          setFalse={setIsPhaseFour}
          setTrue={setGameIsOver}
        />
      );
    if (gameIsOver)
      return (
        <GameOver setFalse={setGameIsOver} setTrue={setIsPhaseTwo} />
      );
    return <Thanks />;
  };
  return renderPhase();
}

export default Main;
