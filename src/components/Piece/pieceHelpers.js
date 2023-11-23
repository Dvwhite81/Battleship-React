import { Space } from './Piece';

const setLength = (name) => {
  let length;
  switch (name) {
    case 'carrier':
      length = 5;
      break;
    case 'battleship':
      length = 4;
      break;
    case 'destroyer':
      length = 3;
      break;
    case 'submarine':
      length = 3;
      break;
    case 'patrolboat':
      length = 2;
      break;
    default:
      break;
  }
  return length;
};

const setDimensions = (length, type) => {
  let height;
  let width;
  if (type === 'horizontal') {
    height = 1;
    width = length;
  } else {
    height = length;
    width = 1;
  }
  return [height, width];
};

const setImage = (type, name) => {
  const v = type === 'vertical' ? '-v' : '';
  const url = `../../images/${name}-real${v}.png`;
  return url;
};

const createSpaces = (name, type, length) => {
  const spaces = [];
  for (let i = 0; i < length; i++) {
    spaces.push(
      <Space
        key={`${type}-${name}-${i}`}
        type={type}
        name={name}
        i={i}
      />,
    );
  }
  return spaces;
};

export { setLength, setDimensions, setImage, createSpaces };
