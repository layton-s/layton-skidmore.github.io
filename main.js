const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const roundElement = document.getElementById('roundNumber');

const panels = [topLeft, bottomRight, bottomLeft, topRight];
const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];
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
  if (!canClick) return;
  userFlash(panel);
  const expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === panel) {
    if (sequenceToGuess.length === 0) {
      // Start new round with a delay
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
    // End game
    alert('Game over');
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

startFlashing();
           