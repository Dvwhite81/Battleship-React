function EmptySquare({ x, y, handleClick }) {
  return (
    <div
      className="square"
      coords={`${x}, ${y}`}
      x={x}
      y={y}
      onClick={handleClick}
    />
  );
}

export default EmptySquare;
