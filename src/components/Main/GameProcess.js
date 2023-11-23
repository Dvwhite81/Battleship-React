import {
  getInfo,
  applyAttack,
  botAttack,
} from './gameProcessHelpers';

const handleClick = (e) => {
  console.log('handleClick');
  const { target } = e;
  const { coords, square, isEmpty } = getInfo(target, botBoard);
  applyAttack(
    '#computer-board',
    botBoard,
    coords,
    square,
    isEmpty,
    setAttackMessageRight,
    setSunkMessageRight,
    setGameOver,
    true,
  );
  botAttack(
    bot,
    playerBoard,
    setAttackMessageLeft,
    setSunkMessageLeft,
    setGameOver,
  );
};
