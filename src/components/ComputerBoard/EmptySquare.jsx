function EmptySquare({ x, y }) {
  return <div className="square" coords={`${x}, ${y}`} x={x} y={y} />;
}

export default EmptySquare;
