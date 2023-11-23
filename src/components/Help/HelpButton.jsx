import { openModal } from './HelpModal';

function HelpButton({ phase }) {
  return (
    <button
      id="help-btn"
      type="submit"
      onClick={() => openModal(phase)}
    >
      Help
    </button>
  );
}

export default HelpButton;
