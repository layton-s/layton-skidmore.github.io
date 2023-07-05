const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const roundElement = document.getElementById('roundNumber');
const startButton = document.getElementById('startButton');
const playAgainButton = document.getElementById('playAgainButton');
const soundEffect = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');

const panels = [topLeft, bottomRight, bottomLeft, topRight];
const sequence = [];
let sequenceToGuess = [];
let canClick = false;
let currentRound = 1;

function getRandomPanel() {
  return panels[Math.floor(Math.random() * panels.length)];
}

async function flash(panel) {
  return new Promise(function (resolve) {
    panel.classList.add('active');
    soundEffect.play(); 
    setTimeout(function () {
      panel.classList.remove('active');
      setTimeout(resolve, 250);
    }, 1000);
  });
}

async function startFlashing() {
  canClick = false;
  await new Promise(function (resolve) {
    setTimeout(resolve, 700);
  });

  const sequenceLength = sequence.length;
  for (let i = 0; i < sequenceLength; i++) {
    const panel = sequence[i];
    await flash(panel);
  }

  canClick = true;
}

function userFlash(panel) {
  panel.classList.add('active');
  soundEffect.play(); 
  setTimeout(function () {
    panel.classList.remove('active');
  }, 500);
}

function panelClicked(panel) {
  if (!canClick) return;
  userFlash(panel);
  const expectedPanel = sequenceToGuess.shift();

  if (expectedPanel === panel) {
    if (sequenceToGuess.length === 0) {
      if (currentRound === 10) {
        endGame(true);
        return;
      }
      canClick = false;
      setTimeout(function () {
        sequence.push(getRandomPanel());
        sequenceToGuess = [...sequence];
        currentRound++;
        roundElement.textContent = `Round ${currentRound}`;
        startFlashing();
        canClick = true;
      }, 1500);
    }
  } else {
    endGame(false);
  }
}

function startGame() {
  startButton.style.display = 'none';
  sequence.push(getRandomPanel());
  sequenceToGuess = [...sequence];
  roundElement.textContent = `Round ${currentRound}`;
  setTimeout(startFlashing, 1000);
  canClick = true;
}

function endGame(playerWon) {
  if (playerWon) {
    alert('Congratulations, you won!');
  } else {
    alert('Game over');
  }
  playAgainButton.style.display = 'block';
  canClick = false;
}

function resetGame() {
  playAgainButton.style.display = 'none';
  sequence.length = 0;
  sequenceToGuess.length = 0;
  currentRound = 1;
  roundElement.textContent = 'Round ' + currentRound;

  setTimeout(function () {
    sequence.push(getRandomPanel());
    sequenceToGuess = [...sequence];
    startFlashing();
    canClick = true;
  }, 1000);
}

playAgainButton.style.display = 'none';