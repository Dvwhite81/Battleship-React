import parse from 'html-react-parser';
import Ship from '../../scripts/Factories/Ship';

const createShip = (e, piece) => {
  const coords = [
    Number(e.target.getAttribute('x')),
    Number(e.target.getAttribute('y')),
  ];
  const isVertical = piece.getAttribute('type') === 'vertical';
  const ship = piece.getAttribute('pieceType');
  const shipName = `player-${ship}`;
  const newShip = Ship(shipName, coords, isVertical);
  return newShip;
};

const savedBoard = () => {
  const board = document.querySelector('#player-board');
  return parse(board.innerHTML);
};

export { createShip, savedBoard };
