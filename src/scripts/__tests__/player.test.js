import Player from '../Factories/Player';
import Gameboard from '../Factories/Gameboard';
import Ship from '../Factories/Ship';

describe('player creation', () => {
  const player = Player('John');
  test('returns player name', () => {
    expect(player.getName()).toBe('John');
  });
  test('starts with an empty array of attacks', () => {
    expect(player.getPreviousAttacks()).toStrictEqual([]);
  });
  test('does not have properties of a computer', () => {
    expect(() => {
      player.attack();
    }).toThrow('player.attack is not a function');
    expect(() => {
      player.makeAllShips();
    }).toThrow('player.makeAllShips is not a function');
  });
});

describe('player attacks', () => {
  const opponentBoard = Gameboard();
  const player = Player('John');
  const carrier = Ship('player-carrier', [0, 0], false);
  opponentBoard.placeShip(carrier);

  test('player can attack and hit a ship', () => {
    player.takeTurn([0, 0], opponentBoard);
    expect(opponentBoard.getAllHits()).toContainEqual([0, 0]);
  });
  test('player can attack and miss a ship', () => {
    player.takeTurn([8, 8], opponentBoard);
    expect(opponentBoard.getAllMisses()).toContainEqual([8, 8]);
  });
});
