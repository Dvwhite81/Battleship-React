import Computer from '../Factories/Computer';
import Gameboard from '../Factories/Gameboard';
import Ship from '../Factories/Ship';

describe('computer creation', () => {
  const bot = Computer();
  test('returns name as "Computer"', () => {
    expect(bot.getName()).toBe('Computer');
  });
  test('starts with an empty array of attacks', () => {
    expect(bot.getPreviousAttacks()).toStrictEqual([]);
  });
});

describe('computer attacks', () => {
  const playerBoard = Gameboard();
  const bot = Computer();
  const carrier = Ship('player-carrier', [0, 0], false);
  playerBoard.placeShip(carrier);

  test('can attack a random square on board', () => {
    bot.attack(playerBoard);
    const boardAllAttacks = [
      ...playerBoard.getAllHits(),
      ...playerBoard.getAllMisses(),
    ];
    expect(boardAllAttacks.length).toBe(1);
  });
  test('keeps track of previous attacks', () => {
    expect(bot.getPreviousAttacks().length).toBe(1);
  });
});

describe('computer creating ships', () => {
  const bot = Computer();
  const botShips = bot.makeAllShips();
  // Empty arrays to fill with ship info
  const shipNames = [];
  const allCoords = [];
  // Fill arrays with info for each ship
  botShips.forEach((ship) => {
    const name = ship.getName();
    // First part is 'computer', second part is ship name
    const shipName = name.split('-')[1];
    shipNames.push(shipName);
    const path = ship.getShipCoords();
    path.forEach((coord) => {
      // Only add unique coords
      if (!allCoords.includes(coord)) {
        allCoords.push(coord);
      }
    });
  });
  test('makes five ships', () => {
    expect(shipNames.length).toBe(5);
  });
  test('ships have correct names', () => {
    expect(shipNames).toStrictEqual([
      'carrier',
      'battleship',
      'destroyer',
      'submarine',
      'patrolboat',
    ]);
  });
  // There should be 17 sets of coords:
  // carrier-5, battleship-4, destroyer-3, submarine-3, patrolboat-2
  test('all coords are unique, none overlapping', () => {
    expect(allCoords.length).toBe(17);
  });
});
