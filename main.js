const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const roundElement = document.getElementById('roundNumber');
const startButton = document.getElementById('startButton');
const playAgainButton = document.getElementById('playAgainButton');
const youWin = document.querySelector('h1');
const youLose = document.querySelector('h2');
const soundEffect = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
const soundEffect2 = new Audio('https://www.soundjay.com/buttons/sounds/button-6.mp3');
const soundEffect3 = new Audio('https://www.soundjay.com/buttons/sounds/button-09a.mp3');
const soundEffect4 = new Audio('https://www.soundjay.com/buttons/sounds/button-11.mp3');

const panels = [topLeft, bottomRight, bottomLeft, topRight];
const sequence = [];
let sequenceToGuess = [];
let canClick = false;
let currentRound = 1;

function getRandomPanel() {
  return panels[Math.floor(Math.random() * panels.length)];
}

function playSoundEffect(panel) {
  if (panel === topLeft) {
    soundEffect.play();
  } else if (panel === topRight) {
    soundEffect2.play();
  } else if (panel === bottomLeft) {
    soundEffect3.play();
  } else if (panel === bottomRight) {
    soundEffect4.play();
  }
}

function userFlash(panel) {
  panel.classList.add('active');
  playSoundEffect(panel);
  setTimeout(function () {
    panel.classList.remove('active');
  }, 500);
}

function startGame() {
  startButton.style.display = 'none';
  playAgainButton.style.display = 'none';
  youWin.style.display = 'none';
  youLose.style.display = 'none';
  sequence.length = 0;
  sequenceToGuess.length = 0;
  currentRound = 1;
  roundElement.textContent = 'Round ' + currentRound;
  sequence.push(getRandomPanel());
  sequenceToGuess = [...sequence];
  roundElement.textContent = `Round ${currentRound}`;
  setTimeout(computerSequence, 1000);
  canClick = true;
}

async function computerSequence() {
  canClick = false; // Disable clicking temporarily
  const sequenceLength = sequence.length; // Get the length of the sequence
  for (let i = 0; i < sequenceLength; i++) {
    const panel = sequence[i]; // Get the panel at the current index
    panel.classList.add('active');
    playSoundEffect(panel);
    await new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
    panel.classList.remove('active');
    await new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 250);
    });
  }
  canClick = true; // Allow clicking again
}

function panelClicked(panel) {
  if (!canClick) return;
  userFlash(panel);
  const expectedPanel = sequenceToGuess.shift(); // Get the expected panel from the sequence to guess
  if (expectedPanel === panel) {
    if (sequenceToGuess.length === 0) {// Check if the entire sequence has been guessed
      if (currentRound === 20) { // Check if it's the final round of the game
        endGame(true);
        return;
      }
      canClick = false; // Disable clicking temporarily
      setTimeout(function () {
        sequence.push(getRandomPanel()); // Generate a new random panel and add it to the sequence
        sequenceToGuess = [...sequence]; // Update the sequence to guess with the new sequence
        currentRound++;
        roundElement.textContent = `Round ${currentRound}`;
        computerSequence();
        canClick = true;
      }, 1500);
    }
  } else {
    endGame(false);
  }
}

function endGame(playerWon) {
  if (playerWon) {
    youWin.style.display = 'block';
  } else {
    youLose.style.display = 'block';
  }
  playAgainButton.style.display = 'block';
  canClick = false;
}


