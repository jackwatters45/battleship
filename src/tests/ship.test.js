import Ship from '../classes/ship';

describe('ship methods', () => {
  let testCarrier;
  let testBattleship;

  beforeEach(() => {
    testCarrier = new Ship(['A1', 'A2', 'A3', 'A4', 'A5'], 'Carrier');
    testBattleship = new Ship(['B1', 'C1', 'D1', 'E1'], 'Battleship');
  });

  it('ship is hit once', () => {
    testCarrier.hit();
    expect(testCarrier.hits).toBe(1);
  });

  it('ship is hit multiple times', () => {
    testBattleship.hit();
    testBattleship.hit();
    expect(testBattleship.hits).toBe(2);
  });

  it('check if ship is sunk (true)', () => {
    testBattleship.hit();
    testBattleship.hit();
    testBattleship.hit();
    testBattleship.hit();
    expect(testBattleship.sunk).toBe(true);
  });

  it('check if ship is sunk (false)', () => {
    testBattleship.hit();
    testBattleship.hit();
    testBattleship.hit();
    expect(testBattleship.sunk).toBe(false);
  });

  it.todo('ship is invalid length');

  it.todo('ship is hit more than its length');
});
