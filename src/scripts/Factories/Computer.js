import Player from './Player';
import Ship from './Ship';
import {
  calculateType,
  calculateLength,
  calculateCoords,
  noneOccupied,
} from './factory-helpers';

const Computer = (() => {
  const createComputer = () => {
    const { getName, getPreviousAttacks, takeTurn } =
      Player('Computer');

    const previousAttacks = [];
    const occupiedCoords = [];

    const randomNumber = (num) => {
      return Math.floor(Math.random() * num);
    };

    const getRandomCoords = () => {
      const x = randomNumber(10);
      const y = randomNumber(10);
      return [x, y];
    };

    const getRandomAttack = () => {
      let found = false;
      let coords;
      while (!found) {
        coords = getRandomCoords();
        if (!previousAttacks.includes(coords)) {
          found = true;
        }
      }
      return coords;
    };

    const attack = (opponentBoard) => {
      const coords = getRandomAttack();
      takeTurn(coords, opponentBoard);
    };

    const makeRandomShip = (shipName) => {
      const options = ['vertical', 'horizontal'];

      let found = false;
      let startCoords;
      let direction;
      let isVertical;
      while (!found) {
        direction = options[Math.random() >= 0.5 ? 1 : 0];
        isVertical = direction === 'vertical';
        startCoords = getRandomCoords();
        const type = calculateType(shipName);
        const length = calculateLength(type);
        const path = calculateCoords(startCoords, length, isVertical);
        if (path && noneOccupied(path, occupiedCoords)) {
          found = true;
          path.forEach((coord) => occupiedCoords.push(coord));
        }
      }

      const ship = Ship(shipName, startCoords, isVertical);
      return ship;
    };

    const makeAllShips = () => {
      const botShips = [];
      const shipNames = [
        'computer-carrier',
        'computer-battleship',
        'computer-destroyer',
        'computer-submarine',
        'computer-patrolboat',
      ];
      shipNames.forEach((shipName) => {
        const ship = makeRandomShip(shipName);
        botShips.push(ship);
      });
      return botShips;
    };

    return {
      getName,
      getPreviousAttacks,
      attack,
      makeAllShips,
    };
  };

  return createComputer;
})();

export default Computer;
