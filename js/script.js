const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const historyList = document.getElementById("historyList");
const rollSound = new Audio("assets/sounds/dice-roll.mp3");

rollSound.volume = 0.6;

let history = [];
let rolling = false;

/* Dice HTML */

const faces = {
  1: `
<div class="face one">
    <span class="dot"></span>
</div>
`,

  2: `
<div class="face two">
    <span class="dot"></span>
    <span class="dot"></span>
</div>
`,

  3: `
<div class="face three">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
</div>
`,

  4: `
<div class="face four">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
</div>
`,

  5: `
<div class="face five">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
</div>
`,

  6: `
<div class="face six">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
</div>
`,
};

/* Show Dice */

function setDice(dice, number) {
  dice.innerHTML = faces[number];
}

/* History */

function updateHistory(total) {
  history.unshift(total);

  if (history.length > 5) {
    history.pop();
  }

  historyList.innerHTML = "";

  history.forEach((value) => {
    historyList.innerHTML += `
        <div class="item">${value}</div>
        `;
  });
}

/* Roll */

function rollDice() {
  if (rolling) return;

  rolling = true;

  rollSound.currentTime = 0;
  rollSound.play();

  dice1.classList.remove("roll");
  dice2.classList.remove("roll");

  void dice1.offsetWidth;

  dice1.classList.add("roll");
  dice2.classList.add("roll");

  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;

  setTimeout(() => {
    setDice(dice1, d1);
    setDice(dice2, d2);

    updateHistory(d1 + d2);

    rolling = false;
  }, 1000);
}

/* Default */

setDice(dice1, 1);
setDice(dice2, 1);

/* Click Anywhere */

document.addEventListener("click", rollDice);
