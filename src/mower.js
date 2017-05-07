class Mower {
  constructor(input) {
    this.lawn = input.split(' ').map(coordinate => parseInt(coordinate, 10));
  }
}

module.exports = Mower;
