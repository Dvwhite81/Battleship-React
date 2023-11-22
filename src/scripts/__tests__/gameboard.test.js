import Computer from '../Factories/Computer';
import Gameboard from '../Factories/Gameboard';
import Ship from '../Factories/Ship';

describe('board creation', () => {
  const board = Gameboard();
  test('returns empty array of ships', () => {
    expect(board.getShips()).toStrictEqual([]);
  });
  test('returns empty array of missed attacks', () => {
    expect(board.getAllMisses()).toStrictEqual([]);
  });
  test('returns empty array of hit attacks', () => {
    expect(board.getAllHits()).toStrictEqual([]);
  });
});

describe('player placing ships', () => {
  const playerBoard = Gameboard();
  const carrier = Ship('player-carrier', [0, 0], false);
  playerBoard.placeShip(carrier);

  test('places ship correctly, with ship info', () => {
    expect(playerBoard.getSpace([0, 0]).boardCoord).toStrictEqual([
      0, 0,
    ]);
    expect(playerBoard.getSpace([0, 0]).shipName).toBe(
      'player-carrier',
    );
    expect(playerBoard.getSpace([0, 0]).shipIndex).toBe(0);
    expect(playerBoard.getSpace([0, 0]).empty).toBe(false);
  });
});

describe('computer placing ships', () => {
  const bot = Computer();
  const botBoard = Gameboard();
  const botShips = bot.makeAllShips();
  for (let i = 0; i < 5; i++) {
    const ship = botShips[i];
    botBoard.placeShip(ship);
    const shipsOnBoard = botBoard.getShips().length;
    test('ships array contains correct number of ships after placing', () => {
      expect(shipsOnBoard).toBe(i + 1);
    });
  }
});

describe('receiving attacks', () => {
  const playerBoard = Gameboard();
  const carrier = Ship('player-carrier', [0, 0], false);
  playerBoard.placeShip(carrier);

  test('attacking an empty square adds coords to missed attacks', () => {
    playerBoard.receiveAttack([8, 8]);
    expect(playerBoard.getAllMisses()).toContainEqual([8, 8]);
  });
  test('attacking a not empty square applies hit to that ship, and adds coords to hit attacks', () => {
    playerBoard.receiveAttack([0, 0]);
    expect(carrier.getTimesHit()).toBe(1);
    expect(carrier.getSpaces()).toStrictEqual([
      true,
      false,
      false,
      false,
      false,
    ]);
    expect(playerBoard.getAllHits()).toContainEqual([0, 0]);
  });
  test('gameboard can report if all ships are sunk', () => {
    expect(playerBoard.allShipsSunk()).toBe(false);
    playerBoard.receiveAttack([0, 1]);
    playerBoard.receiveAttack([0, 2]);
    playerBoard.receiveAttack([0, 3]);
    playerBoard.receiveAttack([0, 4]);
    expect(playerBoard.allShipsSunk()).toBe(true);
  });
});
