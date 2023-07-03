const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const roundElement = document.getElementById('roundNumber');
const startButton = document.getElementById('startButton');
const playAgainButton = document.getElementById('playAgainButton');

const panels = [topLeft, bottomRight, bottomLeft, topRight];
const sequence = [];
let sequenceToGuess = [];
let canClick = false;
let currentRound = 1;

function getRandomPanel() {
  return panels[Math.floor(Math.random() * panels.length)];
}

function flash(panel) {
  return new Promise(function (resolve) {
    panel.classList.add('active');
    setTimeout(function () {
      panel.classList.remove('active');
      setTimeout(resolve, 250);
    }, 1000);
  });
}

function panelClicked(panel) {
    if (!canClick) return; // Check if clicking is currently allowed, if not, exit function
    userFlash(panel); // Apply visual feedback to the clicked panel
    const expectedPanel = sequenceToGuess.shift(); // Retrieve the next panel in the sequence to guess
    if (expectedPanel === panel) { // Check if the clicked panel matches the expected panel
      if (sequenceToGuess.length === 0) { // Check if entire sequence has been guessed correctly
        canClick = false; // Disable clicking temporarily
        setTimeout(function () {
          sequence.push(getRandomPanel()); // Add a new random panel to the sequence
          sequenceToGuess = [...sequence]; // Copy the sequence to guess
          currentRound++; // Increment the current round
          roundElement.textContent = `Round ${currentRound}`; // Update the round number displayed
          startFlashing(); // Start flashing the sequence again
          canClick = true; // Enable clicking again
        }, 1500); // Delay before starting the next round
      }
    } else {
      endGame(); // The clicked panel does not match the expected panel, end the game
    }
  }

async function startFlashing() {
  canClick = false;
  for (const panel of sequence) {
    await flash(panel);
  }
  canClick = true;
}

function userFlash(panel) {
  panel.classList.add('active');
  setTimeout(function () {
    panel.classList.remove('active');
  }, 500);
}

function startGame() {
  startButton.style.display = 'none';
  sequence.push(getRandomPanel());
  sequenceToGuess = [...sequence];
  roundElement.textContent = `Round ${currentRound}`;
  setTimeout(startFlashing, 1000);
  canClick = true;
}

function endGame() {
  alert('Game over');
  playAgainButton.style.display = 'block';
  canClick = false;
}

function resetGame() {
  playAgainButton.style.display = 'none';
  sequence.length = 0;
  sequenceToGuess.length = 0;
  currentRound = 1;
  roundElement.textContent = '';
  startButton.style.display = 'block';
}

playAgainButton.style.display = 'none';