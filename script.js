'use strict';

// const secretNum = Math.trunc(Math.random() * 10) + 1;
// document.querySelector('.number').textContent = secretNum;
let message = document.querySelector('.message');
let hasWon = false;
let highScore = Number(document.querySelector('.highscore').textContent);
let ourScore = Number(document.querySelector('.score').textContent);

const generateRandomNumber = function () {
  let randomNum = Math.trunc(Math.random() * 20) + 1;
  return randomNum;
};

const scoreZero = function (score) {
  if (score > 1) score--;
  else {
    score = 0;
    message.textContent = '😿 You Lost!';
  }
  ourScore = score;
  document.querySelector('.score').textContent = ourScore;
};

const playAgain = function () {
  if (hasWon) {
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
  }
  message.textContent = 'Start guessing...';
  ourScore = 20;
  document.querySelector('.score').textContent = ourScore;
  document.querySelector('.guess').value = '';
  hasWon = false;
  secretNum = generateRandomNumber();
  document.querySelector('.number').textContent = '?';
};

let secretNum = generateRandomNumber();
// document.querySelector('.number').textContent = secretNum;

document.querySelector('.check').addEventListener('click', () => {
  let inputValue = Number(document.querySelector('.guess').value);

  // for no user input
  if (!inputValue) {
    message.textContent = '🛑 No input!';
  }
  // user wins
  else if (inputValue === secretNum && ourScore !== 0) {
    message.textContent = '🎉 You Won!';
    document.querySelector('body').style.backgroundColor = '#3bc43b';
    document.querySelector('.number').style.width = '20rem';
    hasWon = true;
    highScore = ourScore > highScore ? ourScore : highScore;
    document.querySelector('.highscore').textContent = highScore;
    document.querySelector('.number').textContent = secretNum;
  }
  // user input higher than secret num
  else if (inputValue > secretNum && !hasWon) {
    message.textContent = '📈 Too High!';
    scoreZero(ourScore);
  }
  // user input higher than secret num
  else if (inputValue < secretNum && !hasWon) {
    message.textContent = '📉 Too Low!';
    scoreZero(ourScore);
  }
});

document.querySelector('.again').addEventListener('click', () => {
  playAgain();
});
