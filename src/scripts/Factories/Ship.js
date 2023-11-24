import Coords from './Coords';

const Ship = (() => {
  const createShip = (shipName, start, isVertical) => {
    const coords = Coords(shipName, start, isVertical);

    const coordsPath = coords.getPath();
    const length = coords.getLength();
    let spacesArray = Array(length).fill(false);
    let timesHit = 0;
    let sunk = false;

    const getName = () => shipName;

    const getShipCoords = () => coordsPath;

    const getLength = () => length;

    const getSpaces = () => spacesArray;

    const getTimesHit = () => timesHit;

    const isSunk = () => sunk;

    const checkSunk = () => {
      return timesHit >= length;
    };

    const sinkShip = () => (sunk = true);

    const hit = (index) => {
      spacesArray[index] = true;
      timesHit += 1;
      if (checkSunk()) {
        sinkShip();
      }
    };

    const resetShip = () => {
      spacesArray = Array(length).fill(false);
      timesHit = 0;
      sunk = false;
    };

    return {
      getName,
      getShipCoords,
      getLength,
      getSpaces,
      getTimesHit,
      isSunk,
      hit,
      resetShip,
    };
  };

  return createShip;
})();

export default Ship;
