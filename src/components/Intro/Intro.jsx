import { useState } from 'react';
import './Intro.css';

function CurrentStep(step, name, setName) {
  switch (step) {
    case 1:
      return (
        <div id="get-name">
          <p>
            Enter your name, or use the default name "Captain":
            <br />
            <br />
          </p>
          <input
            id="name-input"
            type="text"
            value={name}
            onFocus={() => setName('')}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      );
    case 2:
      return (
        <p>
          You will have 5 ships, which can be placed vertically or
          horizontally.
          <br />
          <br />
          After you place all five ships, the game will begin!
        </p>
      );
    case 3:
      return (
        <p>
          When the game starts, you will take turns with the computer
          trying to sink each other's ships.
          <br />
          <br />
          The game ends when all of one player's ships are sunk.
        </p>
      );
    case 4:
      return (
        <p>
          A red circle will represent a hit ship, and a white circle
          will represent a miss.
        </p>
      );
    case 5:
      return <h3>Have fun and good luck!</h3>;
    default:
  }
}

function CurrentButton(step, setStep, setComplete, getName) {
  switch (step) {
    case 4:
      return <StartButton setComplete={setComplete} />;
    default:
      return (
        <NextButton step={step} setStep={setStep} getName={getName} />
      );
  }
}

function NextButton({ step, setStep, getName }) {
  const handleClick = () => {
    if (step === 1) {
      getName();
    }
    setStep((step += 1));
  };
  return (
    <button id="next-btn" type="submit" onClick={() => handleClick()}>
      Next
    </button>
  );
}

function StartButton({ setComplete }) {
  return (
    <button id="start-btn" type="submit" onClick={setComplete}>
      Start Game
    </button>
  );
}

function Intro({ setComplete, setPlayerName }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Captain');

  const getName = () => {
    setPlayerName(name);
  };

  return (
    <div id="intro-container">
      <h1>Welcome to Battleship!</h1>
      <h2>How to play:</h2>
      <div id="current-step">
        {CurrentStep(step, name, setName)}
        {CurrentButton(step, setStep, setComplete, getName)}
      </div>
    </div>
  );
}

export default Intro;
