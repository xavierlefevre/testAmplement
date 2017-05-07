const Mower = require('./mower');

describe('mower init logic', () => {
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
    expect(new Mower(input).mowers).toEqual([
      { x: 1, y: 2, orientation: 'N', sequence: ['G', 'A', 'G', 'A', 'G', 'A', 'G', 'A', 'A'] },
    ]);
  });

  it("retrieves a second mower's position and sequence", () => {
    const input = `5 5
1 2 N
GAGAGAGAA
3 3 E
AADAADADDA`;
    expect(new Mower(input).mowers).toEqual([
      { x: 1, y: 2, orientation: 'N', sequence: ['G', 'A', 'G', 'A', 'G', 'A', 'G', 'A', 'A'] },
      { x: 3, y: 3, orientation: 'E', sequence: ['A', 'A', 'D', 'A', 'A', 'D', 'A', 'D', 'D', 'A'] },
    ]);
  });

  it("retrieves a third mower's position and sequence", () => {
    const input = `5 5
1 2 N
GAGAGAGAA
3 3 E
AADAADADDA
2 1 W
GADADDA`;
    expect(new Mower(input).mowers).toEqual([
      { x: 1, y: 2, orientation: 'N', sequence: ['G', 'A', 'G', 'A', 'G', 'A', 'G', 'A', 'A'] },
      { x: 3, y: 3, orientation: 'E', sequence: ['A', 'A', 'D', 'A', 'A', 'D', 'A', 'D', 'D', 'A'] },
      { x: 2, y: 1, orientation: 'W', sequence: ['G', 'A', 'D', 'A', 'D', 'D', 'A'] },
    ]);
  });
});

describe('mower movement logic', () => {
  const input = `5 5
1 2 N
G
3 3 E
AADAADADDA`;

  it('applies the first movement from the sequence of the first mower', () => {
    const currentProject = new Mower(input);
    currentProject.moveMowers();

    expect(currentProject.mowers).toEqual([
      { x: 1, y: 2, orientation: 'W', sequence: ['G'] },
      { x: 3, y: 3, orientation: 'E', sequence: ['A', 'A', 'D', 'A', 'A', 'D', 'A', 'D', 'D', 'A'] },
    ]);
  });
});
