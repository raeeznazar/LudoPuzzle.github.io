//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// starting condition
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add("hidden");

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current0El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //  2. diplay dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //    3. check for rolled 1

    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

const winnerAlert = function () {
  //   console.log(`player is ${activePlayer}`);

  let currentPlayerRes = activePlayer;
  console.log(`player no. ${currentPlayerRes} `);
  return currentPlayerRes === 1
    ? alert("winner is player 2")
    : alert("winner is player 1");

  //   if (`${activePlayer}===1`) {
  //     alert("Player two win");
  //   } else {
  //     alert("player one win");
  //   }
};
btnHold.addEventListener("click", function () {
  if (playing) {
    //1.Add current score to active players score

    scores[activePlayer] += currentScore;
    //   score[0] = scores[0]+currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if players score is >=100,Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      winnerAlert();

      //   if (`${activePlayer}==0`) {
      //     alert("player one win");
      //   } else {
      //     alert("player 2 wins");
      //   }
    } else {
      switchPlayer();
    }
    //3.Switching player
  }
});

btnNew.addEventListener("click", init);
