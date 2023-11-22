import {
  calculateType,
  calculateLength,
  calculateCoords,
} from './factory-helpers';

const Coords = (() => {
  const createCoords = (shipName, startCoords, isVertical) => {
    const type = calculateType(shipName);

    const length = calculateLength(type);

    const path = calculateCoords(startCoords, length, isVertical);
    const checkValid = () => {
      if (type === null || length === null || path === null) {
        return false;
      }
      return true;
    };

    const valid = checkValid();

    const getType = () => type;
    const getLength = () => length;
    const getPath = () => path;
    const isValid = () => valid;

    return { getType, getLength, getPath, isValid };
  };

  return createCoords;
})();

export default Coords;
