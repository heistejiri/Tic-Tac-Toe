  const Tic = 'x';
  const Toe = 'c';
  const Winning_TAC = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
  const gamePanel = document.getElementById('TicTacBoard');
  const restartBtn = document.getElementById('restartBtn');
  const boxElements = document.querySelectorAll('[data-box]');
  const winningMessageElement = document.getElementById('winningMessage');
  const winningMessageTextElement = document.querySelector('[data-win-msg-txt]');
  
  let ToeTurn;

  var touch = new Audio();
  var win = new Audio();
  var gameover = new Audio();

  win.src="./win.mp3";
  gameover.src="./gameover.mp3";
  touch.src="./touch.mp3";
  startGame();
  restartBtn.addEventListener('click', startGame);

  function startGame() {
    ToeTurn = false
    boxElements.forEach(box => {
      box.classList.remove(Tic);
      box.classList.remove(Toe);
      box.removeEventListener('click', handleClick);
      box.addEventListener('click', handleClick, { once: true });
    });
    setgamePanelHoverClass();
    winningMessageElement.classList.remove('active');
  }

  function handleClick(e) {
    const box = e.target;
    const currentClass = ToeTurn ? Toe : Tic;
    placeMark(box, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setgamePanelHoverClass();
    }
  }

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Game has Draw!';
      gameover.play();
    } else {
      winningMessageTextElement.innerText = `${ToeTurn ? "O's" : "X's"} Player Wins!`;
      win.play();
    }
    winningMessageElement.classList.add('active');
  }

  function isDraw() {
    return [...boxElements].every(box => {
      return box.classList.contains(Tic) || box.classList.contains(Toe);
    });
  }

  function placeMark(box, currentClass) {
    box.classList.add(currentClass);
  }

  function swapTurns() {
    ToeTurn = !ToeTurn;
  }

  function setgamePanelHoverClass() {
      gamePanel.classList.remove(Tic);
      gamePanel.classList.remove(Toe);
    if (ToeTurn) {
      gamePanel.classList.add(Toe);
      touch.play();
    } else {
      gamePanel.classList.add(Tic);
      touch.play();
    }
  }

  function checkWin(currentClass) {
    return Winning_TAC.some(combination => {
      return combination.every(index => {
        return boxElements[index].classList.contains(currentClass);
      });
    });
  }