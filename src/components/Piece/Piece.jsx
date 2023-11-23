import {
  setLength,
  setDimensions,
  setImage,
  createSpaces,
} from './pieceHelpers';
import { handleDragStart } from '../Main/DragDrop/handlers';
import './Piece.css';

export function Space({ type, name, i }) {
  return (
    <div
      key={`${type}-${name}-${i}`}
      id={`${type}-${name}-${i}`}
      className="occupied"
      index={i}
    />
  );
}

function Piece({ type, name, setPiece }) {
  const length = setLength(name);
  const [height, width] = setDimensions(length, type);
  const img = setImage(type, name);
  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
    height: `${height * 4}vw`,
    width: `${width * 4}vw`,
  };
  const spaces = createSpaces(name, type, length);
  const id = `${type}-${name}`;

  const dragStart = (e) => {
    handleDragStart(e);
    setPiece(e.target);
  };

  return (
    <div
      key={id}
      id={id}
      className={`piece ${type}-piece`}
      type={type}
      length={length}
      img={img}
      piecetype={name}
      style={style}
      draggable
      onDragStart={dragStart}
    >
      {spaces}
    </div>
  );
}

export default Piece;
