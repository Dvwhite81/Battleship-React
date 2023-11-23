import Intro from '../../Intro/Intro';
import './PhaseOne.css';

function PhaseOne({ setFalse, setTrue, setPlayerName }) {
  const setComplete = () => {
    setFalse(false);
    setTrue(true);
  };

  return (
    <div id="phase-one-container">
      <Intro
        setComplete={setComplete}
        setPlayerName={setPlayerName}
      />
    </div>
  );
}

export default PhaseOne;
