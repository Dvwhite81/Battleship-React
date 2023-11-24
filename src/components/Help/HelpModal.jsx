import { phaseTwoText, phaseThreeText } from './helpText';
import './Help.css';

function HelpModal({ phase, isError, setIsError }) {
  return (
    <div id="myModal">
      <button
        id="close-modal"
        type="submit"
        onClick={() => closeModal(isError, setIsError)}
      >
        ×
      </button>
      {phase === 'two'
        ? phaseTwoText(isError)
        : phaseThreeText(isError)}
    </div>
  );
}

export const openModal = (phase) => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'flex';

  const container = document.getElementById(
    `phase-${phase}-container`,
  );

  container.onclick = (e) => {
    if (e.target !== modal) {
      closeModal();
    }
  };
};

const closeModal = (isError, setIsError) => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
  if (isError) {
    setIsError(false);
  }
};

export default HelpModal;
