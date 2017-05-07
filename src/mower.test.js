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
  it('applies the first "G" movement from the sequence of the first mower', () => {
    const input = `5 5
1 2 N
G
3 3 E
AADAADADDA`;
    const currentProject = new Mower(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].orientation).toBe('W');
  });

  it('applies the second "D" movement from the sequence of the first mower', () => {
    const input = `5 5
1 2 N
GD
3 3 E
AADAADADDA`;
    const currentProject = new Mower(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].orientation).toBe('N');
  });

  it('changes the position of the first mower with the "A"', () => {
    const input = `5 5
1 2 N
A
3 3 E
AADAADADDA`;
    const currentProject = new Mower(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].y).toBe(3);
  });

  it('changes the position of the first mower with the a combination', () => {
    const input = `5 5
1 2 N
ADAGGA
3 3 E
AADAADADDA`;
    const currentProject = new Mower(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].y).toBe(3);
    expect(currentProject.mowers[0].x).toBe(1);
    expect(currentProject.mowers[0].orientation).toBe('W');
  });
});
