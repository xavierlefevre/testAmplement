const retrieveLawn = input => input[0].split(' ').map(coordinate => parseInt(coordinate, 10));

const getFirstMowerPosition = input => {
  const mowerPosition = {};
  input.split(' ').map((value, index) => {
    if (index === 0) {
      mowerPosition.x = parseInt(value, 10);
    } else if (index === 1) {
      mowerPosition.y = parseInt(value, 10);
    } else {
      mowerPosition.o = value;
    }
  });
  return mowerPosition;
};

class Mower {
  constructor(input) {
    this.mowers = [];
    const inputLines = input.split('\n');

    this.lawn = retrieveLawn(inputLines);
    this.mowers.push(getFirstMowerPosition(inputLines[1]));
  }
}

module.exports = Mower;
