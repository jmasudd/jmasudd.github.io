'use strict';

// selecting elements
const dice = document.querySelector('.btn--roll');
const diceimg = document.querySelector('.dice');
const hold = document.querySelector('.btn--hold');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const newgame = document.querySelector('.btn--new');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closer = document.querySelector('.close-modal');
const rules = document.querySelector('.btn--help');
let pc1 = player0.classList;
let pc2 = player1.classList;

// stating condition & declarations
let score, player, roll, playing;
const init = () => {
  playing = true;
  score = [0, 0];
  player = 0;
  roll = 0;
  document.getElementById(`current--${player}`).textContent = 0;

  diceimg.classList.add('hide');

  score0.textContent = 0;
  score1.textContent = 0;

  pc1.add('player--active');
  pc2.remove('player--active');
  pc1.remove('player--winner');
  pc2.remove('player--winner');
};

init();

//functions
const clickzz = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const unclickzz = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const escroot = evt => {
  if (evt.key === 'Escape' && !modal.classList.contains('hidden')) {
    unclickzz();
  }
};

const switchplayer = () => {
  document.getElementById(`current--${player}`).textContent = 0;
  roll = 0;
  player == 0 ? (player = 1) : (player = 0);

  pc1.toggle('player--active');
  pc2.toggle('player--active');
};

//operations
rules.addEventListener('click', clickzz);
closer.addEventListener('click', unclickzz);
overlay.addEventListener('click', unclickzz);
document.onkeydown = escroot;

dice.addEventListener('click', function () {
  if (playing) {
    diceimg.classList.remove('hide');
    let rollng = Math.floor(Math.random() * 6 + 1);
    console.log(rollng);
    diceimg.src = `dice-${rollng}.png`;
    if (rollng !== 1) {
      roll += rollng;
      document.getElementById(`current--${player}`).textContent = roll;
    } else {
      switchplayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    score[player] += roll;
    document.getElementById(`score--${player}`).textContent = score[player];
  }

  if (score[player] >= 100) {
    document
      .querySelector(`.player--${player}`)
      .classList.add('player--winner');
    diceimg.classList.add('hide');
    playing = false;
  } else {
    switchplayer();
  }
});

newgame.addEventListener('click', init);
