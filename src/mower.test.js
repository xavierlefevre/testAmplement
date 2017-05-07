const Mower = require('./mower');

describe('mower logic', () => {
  it('generates the lawn', () => {
    const input = '5 5';
    expect(new Mower(input).lawn).toEqual([5, 5]);
  });
});
