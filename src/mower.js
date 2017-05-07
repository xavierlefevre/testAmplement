const retrieveLawn = input => input[0].split(' ').map(coordinate => parseInt(coordinate, 10));

const retrieveMowers = input => {
  const mowers = [];
  let mowersCount = 0;

  input.forEach((lineValue, lineIndex) => {
    if (lineIndex === 0) return;

    if (lineIndex % 2 === 1) {
      const mowerPosition = {};
      input[lineIndex].split(' ').forEach((mowerValue, mowerValueIndex) => {
        if (mowerValueIndex === 0) {
          mowerPosition.x = parseInt(mowerValue, 10);
        } else if (mowerValueIndex === 1) {
          mowerPosition.y = parseInt(mowerValue, 10);
        } else {
          mowerPosition.orientation = mowerValue;
        }
      });
      mowers.push(mowerPosition);
    } else {
      mowers[mowersCount].sequence = input[lineIndex];
      mowersCount++;
    }
  });
  return mowers;
};

class Mower {
  constructor(input) {
    this.mowers = [];
    const inputLines = input.split('\n');

    this.lawn = retrieveLawn(inputLines);
    if (inputLines[1]) this.mowers = retrieveMowers(inputLines);
  }
}

module.exports = Mower;
