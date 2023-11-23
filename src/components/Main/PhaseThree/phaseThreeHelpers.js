const convertGameboard = (board) => {
  const spaces = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const space = board.getSpace([x, y]);
      console.log('space:', space);
    }
  }
};

export default convertGameboard;
