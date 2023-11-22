const Gameboard = (() => {
  const createBoard = (size = 10) => {
    const ships = [];
    let missedAttacks = [];
    let hitAttacks = [];

    const board = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        board.push({
          boardCoord: [i, j],
          shipName: '',
          shipIndex: '',
          empty: true,
        });
      }
    }

    const getSpace = (coord) => {
      return board.find(
        (space) =>
          JSON.stringify(space.boardCoord) === JSON.stringify(coord),
      );
    };

    const getAllHits = () => hitAttacks;

    const getAllMisses = () => missedAttacks;

    const getShips = () => ships;

    const isEmptySingle = (coords) => getSpace(coords).empty;

    const isEmptyAll = (coords) =>
      coords.every((space) => getSpace(space).empty);

    const placeShip = (ship) => {
      ships.push(ship);
      const coords = ship.getShipCoords();

      if (isEmptyAll(coords)) {
        coords.forEach((coord, index) => {
          getSpace(coord).shipName = ship.getName();
          getSpace(coord).shipIndex = index;
          getSpace(coord).empty = false;
        });
      }
    };

    const placeAllShips = (allShips) => {
      allShips.forEach((ship) => placeShip(ship));
    };

    const hitShip = (coords) => {
      console.log('hitShip');
      ships.forEach((ship) => {
        if (JSON.stringify(ship.getShipCoords()).includes(coords)) {
          const index = getSpace([
            Number(coords[0]),
            Number(coords[1]),
          ]).shipIndex;
          ship.hit(index);
        }
      });
    };

    const receiveAttack = (coords) => {
      console.log('receiveAttack');
      if (isEmptySingle(coords)) {
        missedAttacks.push(coords);
      } else {
        hitAttacks.push(coords);
        hitShip(coords);
      }
    };

    const allShipsSunk = () => ships.every((ship) => ship.isSunk());

    const resetBoard = () => {
      missedAttacks = [];
      hitAttacks = [];
      ships.forEach((ship) => ship.resetShip());
    };

    return {
      getSpace,
      isEmptySingle,
      isEmptyAll,
      placeShip,
      placeAllShips,
      hitShip,
      receiveAttack,
      getAllHits,
      getAllMisses,
      getShips,
      allShipsSunk,
      resetBoard,
    };
  };

  return createBoard;
})();

export default Gameboard;
