const cardinalPoints = ['N', 'E', 'S', 'W'];

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
      mowers[mowersCount].sequence = input[lineIndex].split('');
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
    this.mowers[0].sequence.forEach((sequenceValue, sequenceValueIndex) => {
      const cardinalIndex = cardinalPoints.findIndex(element => this.mowers[0].orientation === element);
      if (sequenceValue === 'G')
        this.mowers[0].orientation = cardinalIndex > 0 ? cardinalPoints[cardinalIndex - 1] : cardinalPoints[3];
      else if (sequenceValue === 'D')
        this.mowers[0].orientation = cardinalIndex < 3 ? cardinalPoints[cardinalIndex + 1] : cardinalPoints[0];
      else if (sequenceValue === 'A') {
        if (this.mowers[0].orientation === 'N' && this.mowers[0].y < this.lawn[1]) this.mowers[0].y++;
        else if (this.mowers[0].orientation === 'E' && this.mowers[0].x < this.lawn[0]) this.mowers[0].x++;
        else if (this.mowers[0].orientation === 'S' && this.mowers[0].y > 0) this.mowers[0].y--;
        else if (this.mowers[0].orientation === 'W' && this.mowers[0].x > 0) this.mowers[0].x--;
      }
    });
  }
}

module.exports = Mower;
