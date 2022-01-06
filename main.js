const cells = Array.from(document.getElementsByClassName('cell'));
const board = document.getElementById('board');
const currentTurnText = document.getElementById('currentTurnText');

const overlay = document.getElementById('overlay');
const playBtn = document.getElementById('btn');
const message = document.getElementById('message');

const playerScoreElm = document.getElementById('player-score');
const computerScoreElm = document.getElementById('computer-score');

let currentTurn, playerScore = 0, computerScore = 0;

const PLAYERS = [
    { name: 'Player', Symbol: 'X'},
    { name: 'Computer', Symbol: 'O'}
]

let isGameOver = false;

let wins = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

function getRandomTurn()
{
    return PLAYERS[Math.floor(Math.random() * 2)];
}

function getAvailableCells()
{
    return cells.filter((cell) => {
        return cell.classList.contains('marked') == false;
    });
}

function toggleShowResult() {
    setTimeout(() => {
        overlay.classList.toggle("hide");
        overlay.classList.toggle("show");

    }, 500);
}

function updateScore()
{
    if (currentTurn.name == 'Player') {
        playerScore += 1;
    } else computerScore += 1;

    playerScoreElm.innerHTML = playerScore;
    computerScoreElm.innerHTML = computerScore;
}

function checkWinner()
{
    let result = wins.some((win) => {
        return win.every((index) => {
            if (cells[index].innerHTML == currentTurn.Symbol)
            {
                return true;
            }
        })
    });

    if (result) {
        updateScore();
        message.innerHTML = `Winner: ${currentTurn.name}`;
        isGameOver = true;
        toggleShowResult();
    }
    else if (getAvailableCells().length == 0)
    {
        message.innerHTML = 'DRAW';
        isGameOver = true;
        toggleShowResult();
    }
}

function start()
{
    resetCells();
    currentTurn = getRandomTurn();
    if (currentTurn.name == 'Computer') computerTurn();
}


function resetCells() {
    cells.forEach(cell => {
        cell.classList.remove('marked');
        cell.innerHTML = '';
    })
}

function computerTurn()
{
    const avialbleCells = getAvailableCells();

    if (avialbleCells.length == 0 || isGameOver) return;

    const computerChoice = Math.floor(Math.random() * avialbleCells.length);

    avialbleCells[computerChoice].innerHTML = currentTurn.Symbol;

    avialbleCells[computerChoice].classList.add('marked');

    checkWinner();

    currentTurn = PLAYERS[0];
}
cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        if (currentTurn != PLAYERS[0]) return;
        else if (e.target.classList.contains('marked')) return;
        else if (isGameOver) return;

        e.target.classList.add('marked');
        e.target.innerHTML = currentTurn.Symbol;

        checkWinner();

        currentTurn = PLAYERS[1];
        computerTurn();
    })
});

playBtn.addEventListener('click', () => {
    isGameOver = false;
    toggleShowResult();
    start();
})

start();
