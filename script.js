// gameBoard module
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

  // Clear the array
  const clearArray = () => {
    array.forEach((e, index) => {
      array[index] = 'empty';
    });
  };

  // Remove the game board from the DOM
  const deleteBoard = () => {
    while (gameboardContainer.firstChild) {
      gameboardContainer.removeChild(gameboardContainer.firstChild);
    }
  };

  // Draw the game board on the DOM
  const drawBoard = () => {
    array.forEach((e, index) => {
      const gridCell = document.createElement('div');

      if (e === 'X') {
        // Add X image to the grid cell
        const gridCellImg = document.createElement('img');
        gridCellImg.src = 'assets/svg/noun-crossbones-1002557.svg';
        gridCell.appendChild(gridCellImg);
      }

      if (e === 'O') {
        // Add O image to the grid cell
        const gridCellImg = document.createElement('img');
        gridCellImg.src = 'assets/svg/noun-skull-4522.svg';
        gridCell.appendChild(gridCellImg);
      }

      if (e === 'empty' && !game.checkForWinner(array)) {
        // Add click event listener to the grid cell
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

  // Change the array value at a specific index
  const changeArray = (index, playerLetter) => {
    array[index] = playerLetter;
  };
  // Public methods
  return {
    drawBoard,
    changeArray,
    deleteBoard,
    clearArray,
  };
})();

// game module
const game = (() => {
  let turn = 1;
  const winResultContainer = document.querySelector('#win-result-container');

  // Get the current player turn
  const checkWhichPlayerTurn = () => turn;

  // Change the player turn
  const changePlayerTurn = () => {
    turn = turn === 1 ? 2 : 1;
  };

  // Create the restart button and its event listener
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
    restartButton.classList = 'bg-blue-500 text-white py-2 px-4 rounded font-custom';
  };

  // Handle a draw game scenario
  const DrawGame = () => {
    const winResultContainer = document.querySelector('#win-result-container');
    const winResult = document.createElement('p');

    winResult.innerText = 'Its a Draw!';
    winResult.classList = 'font-custom';

    winResultContainer.appendChild(winResult);
    createRestartbutton();
  };

  // Clear the win result container
  const clearResults = () => {
    while (winResultContainer.firstChild) {
      winResultContainer.removeChild(winResultContainer.firstChild);
    }
  };

  // Check for a winner based on the current game state
  const checkForWinner = (array) => {
    if (turn === 1) {
      // Check for X win conditions
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
      // Check for O win conditions
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

  // Public methods
  return {
    checkWhichPlayerTurn,
    changePlayerTurn,
    checkForWinner,
    createRestartbutton,
    clearResults,
    DrawGame,
  };
})();

// Player factory function
const playerFactory = (playerLetter) => {
  const winResultContainer = document.querySelector('#win-result-container');

  // Select a move on the game board
  const selectMove = (index) => {
    gameBoard.changeArray(index, playerLetter);
  };

  // Declare the winGame function when the player wins
  const winGame = () => {
    const winResult = document.createElement('p');

    winResult.innerText = `The Winner is Player ${playerLetter}!`;
    winResult.classList = 'font-custom text-xl text-white';

    winResultContainer.appendChild(winResult);
    game.createRestartbutton();
  };
  // Public methods
  return { selectMove, winGame };
};

// Create player instances
const player1 = playerFactory('X');
const player2 = playerFactory('O');

// Draw the initial game board
gameBoard.drawBoard();
