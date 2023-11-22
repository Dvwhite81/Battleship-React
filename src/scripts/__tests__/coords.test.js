import Coords from '../Factories/Coords';

describe('valid coords creation', () => {
  const coords = Coords('player-carrier', [0, 0], true);
  test('should return correct ship type', () => {
    expect(coords.getType()).toBe('carrier');
  });
  test('should return correct length', () => {
    expect(coords.getLength()).toBe(5);
  });
  // Vertical
  test('should return correct vertical coords', () => {
    expect(coords.getPath()).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ]);
  });
  // Horizontal
  const coords2 = Coords('player-carrier', [0, 0], false);
  test('should return correct horizontal coords', () => {
    expect(coords2.getPath()).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ]);
  });
  test('should return valid', () => {
    expect(coords.isValid()).toBe(true);
  });
});

describe('invalid coords creation', () => {
  test('should return not valid for invalid type', () => {
    const coords = Coords('CARRIER', [8, 8], true);
    expect(coords.isValid()).toBe(false);
  });
  test('should return not valid for invalid starting coords', () => {
    const coords = Coords('player-carrier', [10, 12], true);
    expect(coords.isValid()).toBe(false);
  });
  test('should return null for accessing invalid type', () => {
    const coords = Coords('CARRIER', [0, 0], true);
    expect(coords.getType()).toBe(null);
  });
  test('should return null for accessing invalid length', () => {
    const coords = Coords('CARRIER', [0, 0], true);
    expect(coords.getLength()).toBe(null);
  });
  test('should return null for accessing invalid coords', () => {
    const coords = Coords('player-carrier', [8, 8], true);
    expect(coords.getPath()).toBe(null);
  });
});
