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

playAgainButton.style.display = 'none';
youWin.style.display = 'none';
youLose.style.display = 'none';

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

async function computerSequence() {
    canClick = false; // Disable clicking temporarily
    const sequenceLength = sequence.length; // Get the length of the sequence
    for (let i = 0; i < sequenceLength; i++) {
      const panel = sequence[i]; // Get the panel at the current index
      panel.classList.add('active'); // Add the 'active' class to the panel
      playSoundEffect(panel); // Play the sound effect
      await new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, 1000);
      }); // Wait for 1 second
      panel.classList.remove('active'); // Remove the 'active' class from the panel
      await new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, 250);
      }); // Wait for 250 milliseconds
    }
    canClick = true; // Allow clicking again
  }

function userFlash(panel) {
  panel.classList.add('active');
  playSoundEffect(panel);
  setTimeout(function () {
    panel.classList.remove('active');
  }, 500);
}

function panelClicked(panel) {
    if (!canClick) return; // Check if clicking is currently allowed
    userFlash(panel); // Flash the panel clicked by the user
    const expectedPanel = sequenceToGuess.shift(); // Get the expected panel from the sequence to guess
    if (expectedPanel === panel) { // Check if the clicked panel matches the expected panel
      if (sequenceToGuess.length === 0) { // Check if the entire sequence has been guessed
        if (currentRound === 15) { // Check if it's the final round of the game
          endGame(true); // End the game with a win
          return;
        }
        canClick = false; // Disable clicking temporarily
        setTimeout(function () {
          sequence.push(getRandomPanel()); // Generate a new random panel and add it to the sequence
          sequenceToGuess = [...sequence]; // Update the sequence to guess with the new sequence
          currentRound++; // Increment the current round counter
          roundElement.textContent = `Round ${currentRound}`; // Update the round display element with the current round number
          computerSequence(); // Start flashing the new sequence
          canClick = true; // Allow clicking again
        }, 1500);
      }
    } else {
      endGame(false); // End the game with a loss if the clicked panel does not match the expected panel
    }
  }

function startGame() {
  startButton.style.display = 'none';
  youWin.style.display = 'none';
  youLose.style.display = 'none';

  sequence.push(getRandomPanel());
  sequenceToGuess = [...sequence];
  roundElement.textContent = `Round ${currentRound}`;
  setTimeout(computerSequence, 1000);
  canClick = true;
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

function resetGame() {
  playAgainButton.style.display = 'none';
  youWin.style.display = 'none';
  youLose.style.display = 'none';

  sequence.length = 0;
  sequenceToGuess.length = 0;
  currentRound = 1;
  roundElement.textContent = 'Round ' + currentRound;

  setTimeout(function () {
    sequence.push(getRandomPanel());
    sequenceToGuess = [...sequence];
    computerSequence();
    canClick = true;
  }, 1000);
}


