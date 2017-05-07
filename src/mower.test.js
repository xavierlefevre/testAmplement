const Mower = require('./mower');

describe('mower logic', () => {
  it('generates the lawn', () => {
    const input = `5 5`;
    expect(new Mower(input).lawn).toEqual([5, 5]);
  });

  it('positions the first mower', () => {
    const input = `5 5
1 2 N`;
    expect(new Mower(input).mowers).toEqual([{ x: 1, y: 2, orientation: 'N' }]);
  });

  it('adds the movement sequence of the first mower', () => {
    const input = `5 5
1 2 N
GAGAGAGAA`;
    expect(new Mower(input).mowers).toEqual([{ x: 1, y: 2, orientation: 'N', sequence: 'GAGAGAGAA' }]);
  });
});
