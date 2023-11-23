import Piece from '../Piece/Piece';
import './PieceContainer.css';

function PieceContainer({ side, setPiece }) {
  const names = [
    'carrier',
    'battleship',
    'destroyer',
    'submarine',
    'patrolboat',
  ];
  const type = side === 'left' ? 'horizontal' : 'vertical';

  return (
    <div id={`${side}-container`} className="side-container">
      {names.map((name) => (
        <Piece
          key={`${type}-${name}`}
          type={type}
          name={name}
          setPiece={setPiece}
        />
      ))}
    </div>
  );
}

export default PieceContainer;
