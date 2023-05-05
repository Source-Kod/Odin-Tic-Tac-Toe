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

  const clearArray = () => {
    array.forEach((e, index) => {
      array[index] = 'empty';
    });
  };

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

      if (e === 'empty' && !game.checkForWinner(array)) {
        gridCell.addEventListener('click', () => {
          if (game.checkWhichPlayerTurn() === 1) {
            player1.selectMove(index);
          } else {
            player2.selectMove(index);
          }

          deleteBoard();
          drawBoard();

          if (game.checkForWinner(array)) {
            game.checkWhichPlayerTurn() === 1
              ? player1.winGame()
              : player2.winGame();
          }

          if (!array.includes('empty') && !game.checkForWinner(array)) game.DrawGame();
          game.changePlayerTurn();
        });
      }

      gameboardContainer.appendChild(gridCell);

      gridCell.classList = 'w-44 h-44 border border-solid';
    });
  };

  const changeArray = (index, playerLetter) => {
    array[index] = playerLetter;
  };
  return {
    drawBoard,
    changeArray,
    deleteBoard,
    clearArray,
  };
})();

const game = (() => {
  let turn = 1;
  const winResultContainer = document.querySelector('#win-result-container');

  const checkWhichPlayerTurn = () => turn;

  const changePlayerTurn = () => {
    turn = turn === 1 ? 2 : 1;
  };

  const createRestartbutton = () => {
    const restartButton = document.createElement('button');

    restartButton.innerText = 'Restart';

    restartButton.addEventListener('click', () => {
      gameBoard.clearArray();
      game.clearResults();
      gameBoard.deleteBoard();
      gameBoard.drawBoard();
      turn = 1;
    });
    winResultContainer.appendChild(restartButton);
    restartButton.classList = 'bg-blue-500 text-white py-2 px-4 rounded font-custom'
  };

  const DrawGame = () => {
    const winResultContainer = document.querySelector('#win-result-container');
    const winResult = document.createElement('p');

    winResult.innerText = 'Its a Draw!';
    winResult.classList = 'font-custom'

    winResultContainer.appendChild(winResult);
    createRestartbutton();
  };

  const clearResults = () => {
    while (winResultContainer.firstChild) {
      winResultContainer.removeChild(winResultContainer.firstChild);
    }
  };

  const checkForWinner = (array) => {
    if (turn === 1) {
      if (array[0] === 'X' && array[1] === 'X' && array[2] === 'X') return true;
      if (array[3] === 'X' && array[4] === 'X' && array[5] === 'X') return true;
      if (array[6] === 'X' && array[7] === 'X' && array[8] === 'X') return true;
      if (array[0] === 'X' && array[3] === 'X' && array[6] === 'X') return true;
      if (array[1] === 'X' && array[4] === 'X' && array[7] === 'X') return true;
      if (array[2] === 'X' && array[5] === 'X' && array[8] === 'X') return true;
      if (array[0] === 'X' && array[4] === 'X' && array[8] === 'X') return true;
      if (array[2] === 'X' && array[4] === 'X' && array[6] === 'X') return true;
    }

    if (turn === 2) {
      if (array[0] === 'O' && array[1] === 'O' && array[2] === 'O') return true;
      if (array[3] === 'O' && array[4] === 'O' && array[5] === 'O') return true;
      if (array[0] === 'O' && array[3] === 'O' && array[6] === 'O') return true;
      if (array[1] === 'O' && array[4] === 'O' && array[7] === 'O') return true;
      if (array[2] === 'O' && array[5] === 'O' && array[8] === 'O') return true;
      if (array[0] === 'O' && array[4] === 'O' && array[8] === 'O') return true;
      if (array[2] === 'O' && array[4] === 'O' && array[6] === 'O') return true;
    }

    return false;
  };

  return {
    checkWhichPlayerTurn,
    changePlayerTurn,
    checkForWinner,
    createRestartbutton,
    clearResults,
    DrawGame,
  };
})();

const playerFactory = (playerLetter) => {
  const winResultContainer = document.querySelector('#win-result-container');

  const selectMove = (index) => {
    gameBoard.changeArray(index, playerLetter);
  };

  const winGame = () => {
    const winResult = document.createElement('p');

    winResult.innerText = `The Winner is Player ${playerLetter}!`;
    winResult.classList = 'font-custom'

    winResultContainer.appendChild(winResult);
    game.createRestartbutton();
  };
  return { selectMove, winGame };
};

const player1 = playerFactory('X');
const player2 = playerFactory('O');

gameBoard.drawBoard();
