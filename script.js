const gameBoard = (() => {
  const array = ['X', 'X', 'O', 'O', 'X', 'O', 'X', 'O', 'X'];
  const gameboardContainer = document.querySelector('#gameboard-container');

  const drawBoard = () => {
    array.forEach((e) => {
      const gridCell = document.createElement('div');

      gridCell.innerText = e;

      gameboardContainer.appendChild(gridCell);
    });
  };
  return { drawBoard };
})();

const playerFactory = (name) => {
  const sayHello = () => console.log(`hello ${name}`);
  return { sayHello };
};

const player1 = playerFactory('player1');
const player2 = playerFactory('player2');

player1.sayHello();
player2.sayHello();

gameBoard.drawBoard();
