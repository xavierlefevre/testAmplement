const retrieveLawn = input => input[0].split(' ').map(coordinate => parseInt(coordinate, 10));

const getFirstMowerPosition = input => {
  const mowerPosition = {};
  input[1].split(' ').map((value, index) => {
    if (index === 0) {
      mowerPosition.x = parseInt(value, 10);
    } else if (index === 1) {
      mowerPosition.y = parseInt(value, 10);
    } else {
      mowerPosition.orientation = value;
    }
  });
  mowerPosition.sequence = input[2];
  return mowerPosition;
};

class Mower {
  constructor(input) {
    this.mowers = [];
    const inputLines = input.split('\n');

    this.lawn = retrieveLawn(inputLines);
    inputLines[1] && this.mowers.push(getFirstMowerPosition(inputLines));
  }
}

module.exports = Mower;
