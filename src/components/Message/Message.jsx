import './Message.css';

function Message({ side, attackMessage, sunkMessage }) {
  return (
    <div id={`${side}-message-div`}>
      <h2>{attackMessage}</h2>
      <h2>{sunkMessage}</h2>
    </div>
  );
}

export default Message;
