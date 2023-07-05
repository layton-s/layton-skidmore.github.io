const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const roundElement = document.getElementById('roundNumber');
const startButton = document.getElementById('startButton');
const playAgainButton = document.getElementById('playAgainButton');
const soundUrls = {
  'topLeft': 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  'topRight': 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
  'bottomLeft': 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  'bottomRight': 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
};


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
      panel.classList.add('active'); // Add the 'active' class to the panel, making it visually active
      setTimeout(function () {
        panel.classList.remove('active'); // Remove the 'active' class from the panel after 1000 milliseconds
        setTimeout(resolve, 250); // Wait for an additional 250 milliseconds before resolving the promise
      }, 1000);
    });
  }
  

  async function startFlashing() {
    canClick = false; // Disable clicking
    await new Promise(function (resolve) {
      setTimeout(resolve, 700); // Add a delay before starting the flashing
    });
  
    const sequenceLength = sequence.length;
    for (let i = 0; i < sequenceLength; i++) {
      const panel = sequence[i];
      await flash(panel); // Flash each panel in the sequence
    }
  
    canClick = true; // Enable clicking again
  }

  function userFlash(panel) {
    panel.classList.add('active');
    setTimeout(function () {
      panel.classList.remove('active');
    }, 500);
  }


  function panelClicked(panel){
    if(!canClick)return; // Check if clicking is currently allowed, if not, exit function
    userFlash(panel); // Apply visual feedback to the clicked panel
    const expectedPanel=sequenceToGuess.shift(); // Retrieve the next panel in the sequence to guess
  
    if(expectedPanel===panel){ // Check if the clicked panel matches the expected panel
      if(sequenceToGuess.length===0){ // Check if entire sequence has been guessed correctly
        if(currentRound===10){ // Check if it's round 10
          endGame(true); // Player won after round 10
          return;
        }
        canClick=false; // Disable clicking temporarily
        setTimeout(function(){
          sequence.push(getRandomPanel()); // Add a new random panel to the sequence
          sequenceToGuess=[...sequence]; // Copy the sequence to guess
          currentRound++; // Increment the current round
          roundElement.textContent=`Round ${currentRound}`; // Update the round number displayed
          startFlashing(); // Start flashing the sequence again
          canClick=true; // Enable clicking again
        },1500); // Delay before starting the next round
      }
    }else{
      endGame(false); // The clicked panel does not match the expected panel, end the game
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