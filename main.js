const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');



function getRandomPanel() {
    const panels = [
      topLeft,
      bottomRight,
      bottomLeft,
      topRight,
    ];
    return panels[parseInt(Math.random() * panels.length)];
  }
  
  const sequence = [getRandomPanel()];
  let sequenceToGuess = [...sequence];
  
  function flash(panel) {
    return new Promise(function (resolve) {
      panel.classList.add('active');
      setTimeout(function () {
        panel.classList.remove('active');
        setTimeout(resolve, 250);
      }, 1000);
    });
  }
  
  let canClick = false;
  
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
  
  startFlashing();
  
  function userFlash(panel) {
    panel.className += ' active';
    setTimeout(function () {
      panel.className = panel.className.replace(' active', '');
    }, 500);
  }

           