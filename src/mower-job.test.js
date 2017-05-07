const MowerJob = require('./mower-job');

describe('mower init logic', () => {
  it('generates the lawn', () => {
    const input = `5 5`;
    expect(new MowerJob(input).lawn).toEqual([5, 5]);
  });

  it('positions the first mower', () => {
    const input = `5 5
1 2 N`;
    expect(new MowerJob(input).mowers).toEqual([{ x: 1, y: 2, orientation: 'N' }]);
  });

  it('adds the movement sequence of the first mower', () => {
    const input = `5 5
1 2 N
GAGAGAGAA`;
    expect(new MowerJob(input).mowers).toEqual([
      { x: 1, y: 2, orientation: 'N', sequence: ['G', 'A', 'G', 'A', 'G', 'A', 'G', 'A', 'A'] },
    ]);
  });

  it("retrieves a second mower's position and sequence", () => {
    const input = `5 5
1 2 N
GAGAGAGAA
3 3 E
AADAADADDA`;
    expect(new MowerJob(input).mowers).toEqual([
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
    expect(new MowerJob(input).mowers).toEqual([
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
    const currentProject = new MowerJob(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].orientation).toBe('W');
  });

  it('applies the second "D" movement from the sequence of the first mower', () => {
    const input = `5 5
1 2 N
GD
3 3 E
AADAADADDA`;
    const currentProject = new MowerJob(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].orientation).toBe('N');
  });

  it('changes the position of the first mower with the "A"', () => {
    const input = `5 5
1 2 N
A
3 3 E
AADAADADDA`;
    const currentProject = new MowerJob(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].y).toBe(3);
  });

  it('changes the position of the first mower with the a combination', () => {
    const input = `5 5
1 2 N
ADAGGA
3 3 E
AADAADADDA`;
    const currentProject = new MowerJob(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].x).toBe(1);
    expect(currentProject.mowers[0].y).toBe(3);
    expect(currentProject.mowers[0].orientation).toBe('W');
  });

  it('takes into account a small lawn bounderies when it moves', () => {
    const input = `2 2
2 1 N
ADAGA
3 3 E
AADAADADDA`;
    const currentProject = new MowerJob(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].x).not.toBe(3);
    expect(currentProject.mowers[0].x).toBe(2);
    expect(currentProject.mowers[0].y).not.toBe(3);
    expect(currentProject.mowers[0].y).toBe(2);
    expect(currentProject.mowers[0].orientation).toBe('N');
  });

  it('moves the two first mowers', () => {
    const input = `4 4
2 1 N
AGAAADA
3 3 E
GGADAG`;
    const currentProject = new MowerJob(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].x).toBe(0);
    expect(currentProject.mowers[0].y).toBe(3);
    expect(currentProject.mowers[0].orientation).toBe('N');
    expect(currentProject.mowers[1].x).toBe(2);
    expect(currentProject.mowers[1].y).toBe(4);
    expect(currentProject.mowers[1].orientation).toBe('W');
  });

  it('moves all mowers', () => {
    const input = `4 4
2 1 N
AGAAADA
3 3 E
GGADAG
0 0 S
AAADAD`;
    const currentProject = new MowerJob(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].x).toBe(0);
    expect(currentProject.mowers[0].y).toBe(3);
    expect(currentProject.mowers[0].orientation).toBe('N');
    expect(currentProject.mowers[1].x).toBe(2);
    expect(currentProject.mowers[1].y).toBe(4);
    expect(currentProject.mowers[1].orientation).toBe('W');
    expect(currentProject.mowers[2].x).toBe(0);
    expect(currentProject.mowers[2].y).toBe(0);
    expect(currentProject.mowers[2].orientation).toBe('N');
  });
});

describe('outputs the right informations', () => {
  it('passes the test', () => {
    const input = `5 5
1 2 N
GAGAGAGAA
3 3 E
AADAADADDA`;
    const currentProject = new MowerJob(input);
    currentProject.moveMowers();

    expect(currentProject.mowers[0].x).toBe(1);
    expect(currentProject.mowers[0].y).toBe(3);
    expect(currentProject.mowers[0].orientation).toBe('N');
    expect(currentProject.mowers[1].x).toBe(5);
    expect(currentProject.mowers[1].y).toBe(1);
    expect(currentProject.mowers[1].orientation).toBe('E');
  });

  it('outputs the right result', () => {
    const input = `5 5
1 2 N
GAGAGAGAA
3 3 E
AADAADADDA`;
    const currentProject = new MowerJob(input);
    currentProject.moveMowers();
    currentProject.outputPositions();

    expect(currentProject.output).toBe(
      `1 3 N
5 1 E`
    );
  });
});
