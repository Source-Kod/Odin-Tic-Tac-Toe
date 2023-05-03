const gameBoard = (() => {
  const array = ['X', 'X', 'O', 'O', 'X', 'O', 'X', 'O', 'X'];
  const gameboardContainer = document.querySelector('#gameboard-container');

  const drawBoard = () => {
    array.forEach((e) => {
      const gridCell = document.createElement('div');

      if (e === 'X') {
        const gridCellImg = document.createElement('img');
        gridCellImg.src = 'assets/svg/noun-crossbones-1002557.svg';
        gridCell.appendChild(gridCellImg);
      }

      if (e === 'O') {
        const gridCellImg = document.createElement('img');
        gridCellImg.src = 'assets/svg/noun-skull-4522.svg';
        gridCell.appendChild(gridCellImg);
      }

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
