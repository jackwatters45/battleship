import Ship from '../classes/ship';

it('hit function that increments hit property', () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.hits).toBe(3);
});
