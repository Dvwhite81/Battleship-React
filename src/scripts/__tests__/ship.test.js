import Ship from '../Factories/Ship';

describe('ship creation', () => {
  const carrier = Ship('player-carrier', [0, 0], false);
  const submarine = Ship('player-submarine', [2, 7], true);

  test('returns correct name', () => {
    expect(carrier.getName()).toBe('player-carrier');
    expect(submarine.getName()).toBe('player-submarine');
  });
  test('returns correct coords', () => {
    expect(carrier.getShipCoords()).toStrictEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ]);
    expect(submarine.getShipCoords()).toStrictEqual([
      [2, 7],
      [3, 7],
      [4, 7],
    ]);
  });
  test('returns correct length', () => {
    expect(carrier.getLength()).toBe(5);
    expect(submarine.getLength()).toBe(3);
  });
  test('returns array of false', () => {
    expect(carrier.getSpaces()).toStrictEqual([
      false,
      false,
      false,
      false,
      false,
    ]);
  });
  test('returns times hit as 0', () => {
    expect(carrier.getTimesHit()).toBe(0);
  });
  test('returns isSunk as false', () => {
    expect(carrier.isSunk()).toBe(false);
  });
});

describe('hit info', () => {
  test('returns correct times hit', () => {
    const carrier = Ship('player-carrier', [0, 0], false);
    carrier.hit(0);
    expect(carrier.getTimesHit()).toBe(1);
    carrier.hit(1);
    carrier.hit(2);
    expect(carrier.getTimesHit()).toBe(3);
  });
  test('returns correct spaces hit', () => {
    const carrier = Ship('player-carrier', [0, 0], false);
    carrier.hit(0);
    carrier.hit(1);
    carrier.hit(2);
    expect(carrier.getSpaces()).toStrictEqual([
      true,
      true,
      true,
      false,
      false,
    ]);
  });
  test('returns correct isSunk', () => {
    const carrier = Ship('player-carrier', [0, 0], false);
    carrier.hit(0);
    carrier.hit(1);
    carrier.hit(2);
    expect(carrier.isSunk()).toBe(false);
    carrier.hit(3);
    carrier.hit(4);
    expect(carrier.isSunk()).toBe(true);
  });
});
