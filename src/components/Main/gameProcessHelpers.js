const getBoardCoords = (target) => {
  const x = Number(target.getAttribute('x'));
  const y = Number(target.getAttribute('y'));
  return [x, y];
};

const getSquare = (coords, board) => {
  const square = board.getSpace(coords);
  return square;
};

const getInfo = (target, board) => {
  const coords = getBoardCoords(target);
  const square = getSquare(coords, board);
  const isEmpty = square.empty === true;
  console.log('getInfo target:', target);
  console.log('getInfo coords:', coords);
  console.log('getInfo square:', square);
  console.log('getInfo isEmpty:', isEmpty);

  return {
    coords,
    square,
    isEmpty,
  };
};

const getShipLength = (ship) => {
  console.log('getShipLength ship:', ship);
  const shipName = ship.split('-')[1];
  switch (shipName) {
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

const handleHit = (ship, board) => {
  console.log('handleHit ship:', ship);
  console.log('handleHit board:', board);
};

const checkSunk = (ship, shipHits, length) => {
  let sunk = false;
  console.log('checkSunk length:', length);
  console.log('checkSunk shipHits:', shipHits[ship]);
  if (shipHits[ship] >= length) {
    console.log('TRUE');
    sunk = true;
  }
  return sunk;
};

const placeHitOrMiss = (board, x, y, isEmpty) => {
  console.log('placeHitOrMiss board:', board);
  console.log('placeHitOrMiss x:', x);
  console.log('placeHitOrMiss y:', y);
  console.log('placeHitOrMiss isEmpty:', isEmpty);

  const classToAdd = isEmpty === true ? 'miss' : 'hit';
  const hitOrMiss = document.createElement('div');
  hitOrMiss.className = classToAdd;
  const square = document.querySelector(
    `${board} [coords="${x}, ${y}"]`,
  );
  square.append(hitOrMiss);
};

const changeMessage = (type, message) => {
  type(message);
  setTimeout(() => {
    type('');
  }, 5000);
};

const botAttack = (
  bot,
  board,
  setHitOrMiss,
  setSunkShip,
  setComplete,
) => {
  bot.attack(board);
  const prevAttacks = bot.getPreviousAttacks();
  const { length } = prevAttacks;
  const coords = prevAttacks[length - 1];
  const square = getSquare(coords, board);
  const isEmpty = square.empty === true;

  applyAttack(
    '#player-board',
    coords,
    square,
    isEmpty,
    setHitOrMiss,
    setSunkShip,
    setComplete,
    false,
  );
};

const applyAttack = async (
  domBoard,
  board,
  coords,
  square,
  isEmpty,
  setHitOrMiss,
  setSunkShip,
  setComplete,
  isPlayer,
) => {
  console.log('applyAttack');
  const [x, y] = coords;
  console.log('applyAttack coords:', coords);

  placeHitOrMiss(domBoard, x, y, isEmpty);
  if (isEmpty) {
    if (isPlayer) {
      changeMessage(setHitOrMiss, 'You Missed!');
    } else {
      changeMessage(setHitOrMiss, 'Computer Missed!');
    }
  } else {
    const ship = square.shipName;
    const shipName = ship.split('-')[1];
    const length = getShipLength(ship);

    handleHit(ship, board);
    let shipIsSunk = false;
    if (checkSunk(ship, length) === true) {
      shipIsSunk = true;
      if (isPlayer) {
        console.log('ISPLAYER');
        changeMessage(setSunkShip, `You sank the ${shipName}!`);
      } else {
        console.log('NOT ISPLAYER');
        changeMessage(setSunkShip, `Computer sank your ${shipName}!`);
      }
    }
    console.log('shipIsSunk boardShip, shipIsSunk:', shipIsSunk);
    if (shipIsSunk) {
      console.log('shipIsSunk');
    }
    if (isPlayer) {
      changeMessage(setHitOrMiss, `You hit the ${shipName}!`);
    } else {
      changeMessage(setHitOrMiss, `Computer hit your ${shipName}!`);
    }
  }
};

export { getInfo, botAttack, applyAttack };
