const Mower = require('./mower');

describe('mower logic', () => {
  const input = `5 5
1 2 N`;

  it('generates the lawn', () => {
    expect(new Mower(input).lawn).toEqual([5, 5]);
  });

  it('places the first mower', () => {
    expect(new Mower(input).mowers).toEqual([{ x: 1, y: 2, o: 'N' }]);
  });
});
