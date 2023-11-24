const calculateType = (shipName) => {
  const shipType = shipName.split('-')[1];
  const validTypes = [
    'carrier',
    'battleship',
    'destroyer',
    'submarine',
    'patrolboat',
  ];

  if (shipType && validTypes.includes(shipType)) {
    return shipType;
  }
  return null;
};

const calculateLength = (type) => {
  switch (type) {
    case 'carrier':
      return 5;
    case 'battleship':
      return 4;
    case 'destroyer':
      return 3;
    case 'submarine':
      return 3;
    case 'patrolboat':
      return 2;
    default:
      return null;
  }
};

const validRange = (num) => num >= 0 && num < 10;

const calculateCoords = (startCoords, length, isVertical) => {
  const coordsPath = [];
  const [startX, startY] = startCoords;
  let start;
  let end;

  if (isVertical) {
    start = startX;
    end = startX + (length - 1);
    for (let i = start; i <= end; i++) {
      coordsPath.push([i, startY]);
    }
  } else {
    start = startY;
    end = startY + (length - 1);
    for (let i = start; i <= end; i++) {
      coordsPath.push([startX, i]);
    }
  }

  if (![startX, startY, start, end].every(validRange)) {
    return null;
  }
  return coordsPath;
};

const noneOccupied = (coords, occupiedCoords) => {
  occupiedCoords = JSON.stringify(occupiedCoords);
  let allEmpty = true;

  coords.forEach((coord) => {
    coord = JSON.stringify(coord);
    if (occupiedCoords.indexOf(coord) !== -1) {
      allEmpty = false;
    }
  });

  return allEmpty;
};

export {
  calculateType,
  calculateLength,
  calculateCoords,
  noneOccupied,
};
