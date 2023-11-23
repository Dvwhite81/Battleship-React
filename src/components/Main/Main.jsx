import { useState } from 'react';
import PhaseOne from './PhaseOne/PhaseOne';
import PhaseTwo from './PhaseTwo/PhaseTwo';
import PhaseThree from './PhaseThree/PhaseThree';
import GameOver from './GameOver/GameOver';
import Thanks from './Thanks/Thanks';
import Player from '../../scripts/Factories/Player';
import Gameboard from '../../scripts/Factories/Gameboard';
import Computer from '../../scripts/Factories/Computer';

function Main() {
  const [isPhaseOne, setIsPhaseOne] = useState(true);
  const [isPhaseTwo, setIsPhaseTwo] = useState(false);
  const [isPhaseThree, setIsPhaseThree] = useState(false);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [playerName, setPlayerName] = useState('Captain');
  const [playerBoard, setPlayerBoard] = useState(null);
  const [savedBoard, setSavedBoard] = useState(null);
  const [winner, setWinner] = useState(null);

  const player = Player(playerName);
  const placeholderBoard = Gameboard();
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
          board={placeholderBoard}
          setPlayerBoard={setPlayerBoard}
          setSavedBoard={setSavedBoard}
        />
      );
    }
    if (isPhaseThree) {
      console.log('isPhaseThree');
      return (
        <PhaseThree
          setFalse={setIsPhaseThree}
          setTrue={gameIsOver}
          setWinner={setWinner}
          player={player}
          playerBoard={playerBoard}
          bot={bot}
          botBoard={botBoard}
          savedBoard={savedBoard}
        />
      );
    }
    if (gameIsOver)
      return (
        // To play again - set both. To end - only setFalse?
        <GameOver
          setFalse={setGameIsOver}
          setTrue={setIsPhaseTwo}
          winner={winner}
        />
      );
    return <Thanks />;
  };
  return renderPhase();
}

export default Main;
