import Gameboard from '../classes/gameboard';

describe('tests for gameboard', () => {
  let gameboard;
  let ship1;
  let ship2;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship1 = gameboard.placeShip(['A1', 'B1', 'C1', 'D1'], 'Battleship');
    ship2 = gameboard.placeShip(['A2', 'B2', 'C2'], 'Cruiser');

    gameboard.receiveAttack('A2');
    gameboard.receiveAttack('B2');
    gameboard.receiveAttack('A3');
  });

  it('make gameboard', () => {
    expect(gameboard.board).toBeDefined();
  });

  it('coordinates have attacked and ship placed properties set to false', () => {
    expect(gameboard.board['A4']).toStrictEqual({
      shipPlaced: false,
      attacked: false,
    });
  });

  it('new ship is added to the board', () => {
    expect(ship1).toMatchObject({
      coordinates: ['A1', 'B1', 'C1', 'D1'],
      hits: 0,
      length: 4,
      sunk: false,
    });
  });

  it('account for out of bounds', () => {
    expect(() => gameboard.placeShip(['Z2', 'C6'])).toThrow(
      'Invalid Placement'
    );
  });

  it('try to place ship where one already exists', () => {
    expect(() => gameboard.placeShip(['A1', 'A2'])).toThrow(
      'Invalid Placement'
    );
  });

  it('receive attack that misses', () => {
    expect(gameboard.board['A3'].attacked).toBe(true);
  });

  it('receive attack that hits', () => {
    expect(gameboard.board['A2'].attacked).toBe(true);
    expect(gameboard.board['A2'].shipPlaced.hits).toEqual(2);
  });

  it('ship is sunk', () => {
    gameboard.receiveAttack('C2');
    expect(gameboard.board['A2'].shipPlaced.sunk).toBe(true);
  });

  it('all users ships are sunk', () => {
    gameboard.receiveAttack('C2');
    gameboard.receiveAttack('A1');
    gameboard.receiveAttack('B1');
    gameboard.receiveAttack('D1');
    expect(gameboard.receiveAttack('C1')).toBe(true);
  });

  it('all users ships are not sunk', () => {
    gameboard.receiveAttack('C2');
    gameboard.receiveAttack('A1');
    expect(gameboard.receiveAttack('C1')).toBeUndefined();
  });

  it('place random ships', () => {
    expect(() => gameboard.placeRandShips()).not.toThrow();
  });
});
