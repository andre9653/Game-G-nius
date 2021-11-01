/* eslint-disable no-alert */
/* eslint-disable no-undef */
let order = [];
let clickedOrder = [];
let score = 0;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

const createColorElement = (color) => {
  switch (color) {
    case 0: return green;
    case 1: return red;
    case 2: return yellow;
    case 3: return blue;
    default: return alert('unspent color');
  }
};

const lightColor = (element, number) => {
  let time = number;
  time *= 500;
  setTimeout(() => {
    element.classList.add('selected');
  }, time - 250);
  setTimeout(() => {
    element.classList.remove('selected');
  }, time);
};

const randomNumber = () => {
  const colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  order.forEach((ord, index) => {
    const elementColor = createColorElement(ord);
    lightColor(elementColor, index + 1);
  });
};

const incrementScore = () => {
  const elementScore = document.querySelector('.score');
  const scoreVerified = score
    ? elementScore.innerText = score
    : 0;
  elementScore.innerText = scoreVerified;
};

const nextLevel = () => {
  randomNumber();
  incrementScore();
  score += 1;
};

const playGame = () => {
  alert('Bem vindo ao Gênesis! Iniciando o jogo');
  score = 0;

  nextLevel();
};

const lose = () => {
  alert(`Pontuação: ${score}\n você perdeu!\n click em ok para iniciar um novo jogo`);
  order = [];
  clickedOrder = [];

  playGame();
};

const checkOrder = () => {
  clickedOrder.forEach((orderClicked, index) => {
    if (orderClicked !== order[index]) {
      return lose();
    }
    if (clickedOrder.length === order.length) {
      alert(`Pontuação: ${score}\nVocê acertou! Iniciando proximo nivel!`);
      return nextLevel();
    }
  });
};

const click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250);
};

green.addEventListener('click', () => click(0));
red.addEventListener('click', () => click(1));
yellow.addEventListener('click', () => click(2));
blue.addEventListener('click', () => click(3));

playGame();
