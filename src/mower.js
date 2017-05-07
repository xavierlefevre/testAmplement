const cardinalPoints = ['N', 'E', 'S', 'W'];

const retrieveLawn = input => input[0].split(' ').map(coordinate => parseInt(coordinate, 10));

const retrieveMowers = input => {
  const mowers = [];
  let mowersCount = 0;

  input.forEach((lineValue, lineIndex) => {
    if (lineIndex === 0) return;

    if (lineIndex % 2 === 1) {
      const mowerPosition = {};
      lineValue.split(' ').forEach((mowerValue, mowerValueIndex) => {
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
      mowers[mowersCount].sequence = lineValue.split('');
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

  moveMowers() {
    this.mowers.forEach(mowerValue => {
      mowerValue.sequence.forEach((sequenceValue, sequenceValueIndex) => {
        const cardinalIndex = cardinalPoints.findIndex(element => mowerValue.orientation === element);
        if (sequenceValue === 'G')
          mowerValue.orientation = cardinalIndex > 0 ? cardinalPoints[cardinalIndex - 1] : cardinalPoints[3];
        else if (sequenceValue === 'D')
          mowerValue.orientation = cardinalIndex < 3 ? cardinalPoints[cardinalIndex + 1] : cardinalPoints[0];
        else if (sequenceValue === 'A') {
          if (mowerValue.orientation === 'N' && mowerValue.y < this.lawn[1]) mowerValue.y++;
          else if (mowerValue.orientation === 'E' && mowerValue.x < this.lawn[0]) mowerValue.x++;
          else if (mowerValue.orientation === 'S' && mowerValue.y > 0) mowerValue.y--;
          else if (mowerValue.orientation === 'W' && mowerValue.x > 0) mowerValue.x--;
        }
      });
    });
  }
}

module.exports = Mower;
