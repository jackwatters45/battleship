import Gameboard from '../classes/gameboard';

describe('tests for ganeboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  it('make gameboard', () => {
    expect(gameboard.gameboard).toBeDefined();
  });
});
