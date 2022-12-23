import Player from '../classes/player';
import Computer from '../classes/computer';

describe('player and computer class', () => {
  let player;
  let computer;

  beforeEach(() => {
    player = new Player('Me');
    computer = new Computer();
    player.setOpponentGameboard(computer.gameBoard);
    computer.setOpponentGameboard(player.gameBoard);
    computer.gameBoard.placeShip(['A1', 'B1', 'C1', 'D1'], 'Battleship');
  });

  it('all objects exist', () => {
    expect(player).toBeDefined();
    expect(computer).toBeDefined();
  });

  it('user wants to play again -> create new gameboard for player', () => {
    const oldGameboard = player.gameBoard;
    player.createNewGameboard();
    expect(oldGameboard).not.toBe(player.gameBoard);
  });

  it('user wants to play again -> create new gameboard for computer', () => {
    const oldGameboard = computer.gameBoard;
    computer.createNewGameboard();
    expect(oldGameboard).not.toBe(computer.gameBoard);
  });

  it('player attacks', () => {
    player.attack('A1', computer.gameBoard);
    expect(computer.gameBoard.board.A1).toMatchObject({ attacked: true });
  });

  it('computer attacks random location', () => {
    computer.randomAttack();
    expect(computer.moves.length).toEqual(1);
  });

  it('computer attacks multiple random location', () => {
    computer.randomAttack();
    computer.randomAttack();
    expect(computer.moves.length).toEqual(2);
  });
});
