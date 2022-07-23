'use strict';

let turnPlayer = 'X';
let gameActivity = true;

const cells = document.querySelectorAll('.cell');
const statusGame = document.querySelector('.game__status');
const restartGame = document.querySelector('.game__restart');
const gameState = ['', '', '', '', '', '', '', '', ''];
const winingLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Функиця смены игрока
 function handlePlayerChange() {
  turnPlayer === 'X' ? turnPlayer = '0' : turnPlayer = 'X';
  gameActivity === true ? statusGame.textContent = `It's ${turnPlayer}'s turn` : statusGame.textContent;
}

// Функция нажатия по клетке
function setMarkArea(event) {
  let getDataCell = event.target.dataset.cellIndex;
    
  if (!gameActivity || gameState[getDataCell] !== '') {
    return;
  } else {
    gameState[getDataCell] = turnPlayer;
    event.target.textContent = turnPlayer;
    playerWin();
    handlePlayerChange(turnPlayer);
  }
}

// Функция определения победителя
function playerWin() {
  for (let i = 0; i < winingLines.length; i++) {
    let winLine = winingLines[i];
    const a = gameState[winLine[0]];
    const b = gameState[winLine[1]];
    const c = gameState[winLine[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      gameActivity = false;
      statusGame.textContent = `Player ${turnPlayer} has won!`;
      break;
    }
  }
  
  if (!gameState.includes('')) {
    gameActivity = false;
    statusGame.textContent = `Game ended in a draw!`;
  }
}

function clearArea() {
  gameActivity = true;
  turnPlayer = 'X';
  statusGame.textContent = `It's X's turn`;
  
  cells.forEach(cellClear => {
    cellClear.textContent = '';
  })

  gameState.forEach((elem, index, array) => {
    array[index] = '';
  })
}

// Нажатие на поле от 0-8
cells.forEach(cellChecked => {
  cellChecked.addEventListener('click', setMarkArea)
})

// Перезапустить игру
restartGame.addEventListener('click', event => {
  event.preventDefault();
  // Очистка поля
  clearArea();
})


