const gameBoard = (() => {
  const array = [
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ];
  const gameboardContainer = document.querySelector('#gameboard-container');

  const deleteBoard = () => {
    while (gameboardContainer.firstChild) {
      gameboardContainer.removeChild(gameboardContainer.firstChild);
    }
  };

  const drawBoard = () => {
    array.forEach((e, index) => {
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

      if (e === 'empty') {
        gridCell.addEventListener('click', () => {
          if (game.checkWhichPlayerTurn() === 1) {
            player1.selectMove(index);
          } else {
            player2.selectMove(index);
          }
          game.changePlayerTurn();
          deleteBoard();
          drawBoard();
        });
      }

      gameboardContainer.appendChild(gridCell);

      gridCell.classList = 'w-44 h-44 border border-solid';
    });
  };

  const changeArray = (index, playerLetter) => {
    array[index] = playerLetter;
  };
  return { drawBoard, changeArray, deleteBoard };
})();

const game = (() => {
  let turn = 1;

  const checkWhichPlayerTurn = () => turn;

  const changePlayerTurn = () => {
    turn = turn === 1 ? 2 : 1;
  };

  return { checkWhichPlayerTurn, changePlayerTurn };
})();

const playerFactory = (playerLetter) => {
  const selectMove = (index) => {
    gameBoard.changeArray(index, playerLetter);
  };
  return { selectMove };
};

const player1 = playerFactory('X');
const player2 = playerFactory('O');

gameBoard.drawBoard();
