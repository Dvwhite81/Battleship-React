const phaseTwoText = (isError) => {
  if (isError) {
    return dropOnOccupiedText();
  }
  return phaseTwoHelpText();
};

const phaseTwoHelpText = () => {
  return (
    <div id="modal-text">
      <h2>Drag a piece onto the board!</h2>
      <h4>
        You get 5 total ships.
        <br />
        You can choose horizontal (left) or vertical (right).
      </h4>
      <h4>
        When you place a ship, the matching piece will also disappear.
      </h4>
    </div>
  );
};

const dropOnOccupiedText = () => {
  return (
    <div id="modal-text">
      <h2>You can't drop a piece there!</h2>
      <h4>
        Any square that has a ship image is already occupied.
        <br />
        Try dropping a piece on an empty space!
      </h4>
      <h4>
        Remember, you can pick a piece from the left or right side!
      </h4>
    </div>
  );
};

const phaseThreeText = () => {
  return (
    <div id="modal-text">
      <h2>The board on the right is the computer's board</h2>
      <h4>
        Click on a square to attack.
        <br />A red circle represents a hit ship, a white circle
        represents a miss
      </h4>
      <h4>
        Then the computer will attack your board and show hits and
        misses
      </h4>
    </div>
  );
};

export { phaseTwoText, phaseThreeText };
