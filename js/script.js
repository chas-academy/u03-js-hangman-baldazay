// Array with words
const wordList = [
  "flygplan",
  "universum",
  "karaoke",
  "fisk",
  "krokodil",
  "kärlek",
  "webbutveckling",
  "julgran",
  "björn",
  "kalender",
  "banana",
];

// Array with images 
const imgList = [
  "img/h0.png",
  "img/h1.png",
  "img/h2.png",
  "img/h3.png",
  "img/h4.png",
  "img/h5.png",
  "img/h6.png",
];

// Array with messages player may get if makes a mistake
const messageList = [
  "Vill du hänga lite?",
  "Det är inte jag som ska hänga här.",
  "Hallo! Vakna!",
  "Fel, Fel, Fel.",
  "Googla?))",
  "Bravo. Det är helt ... fel."
]


let selectedWord;     // Chosen random word
let misses;       // Max number of mistakes aloud
let guesses;      // The number of guesses made
let lettersFound;
let hangmanImg;       // Path to image that will be displayed and changed if player makes a mistake.
let msgHolderEl = document.querySelector("#message");     // DOM-nod: Shows messages
let startGameBtnEl = document.querySelector("#startGameBtn");     // DOM-nod: Start game button
let letterButtonEls = document.querySelectorAll("#letterButtons button");     // Array av DOM-noder: Letter buttons
let letterBoxEls = document.querySelectorAll("#letterBoxes ul li");     // Array av DOM-noder: Letter boxes (random word)
let letterBoxContainer = document.querySelector('#letterBoxes');
let letterBoxContainerEl = document.querySelector("#letterBoxes ul");
let letterButtonContainerEl = document.querySelector("ul#letterButtons");
let hangmanImgEl = document.querySelector("#hangman");

startGameBtnEl.addEventListener("click", startGame);

letterButtonContainerEl.addEventListener("click", guessLetter);

//Function that shows a message.
function informUser(message) {
  msgHolderEl.innerText = message;
}


function guessLetter(e) {
  let inputBtn = letterBoxContainer.querySelectorAll("input");
  let clickedBtn = e.target.value;
  let matchesLetter = selectedWord.includes(clickedBtn);
  console.log(`Clicked button ${clickedBtn}`)

  for (n = 0; n < selectedWord.length; n++) {
    if (clickedBtn === selectedWord[n]) {
      inputBtn[n].value = clickedBtn;
      lettersFound++;
      console.log("Letter found");
      console.log(`Letter ${clickedBtn} was found at position ${n}`)
    }
  }

  if (matchesLetter === false) {
    misses--
    guesses++;
    setHangManImg(guesses);
    informUser(`${messagePhrase(messageList)} Det är ${misses} misstag kvar`);
    console.log("Letter not found");
  }
  deactivateLetter(clickedBtn);
  gameResult();
}


//Function that updates image when a player does a mistake
function setHangManImg(index) {
  hangmanImg = imgList[index];
  hangmanImgEl.setAttribute("src", hangmanImg);
}

// Function that chooses random word from the array
function randomWord(wordList) {
  const randomNumber = Math.floor(Math.random() * wordList.length);
  console.log("Word to find - " + wordList[randomNumber]);
  return wordList[randomNumber];
}

function messagePhrase(messageList) {
  const randomMessageNumber = Math.floor(Math.random() * messageList.length);
  return messageList[randomMessageNumber];
}

//Function that clears letter boxes
function removeLB() {
  letterBoxContainerEl.innerHTML = "";
}

// Function that produces the number of letter boxes
function generateLB(amount) {
  for (let i = 0; i < amount; i++) {
    let newLi = document.createElement("li");
    newLi.innerHTML = '<input type="text" disabled value=" "/>';
    letterBoxContainerEl.appendChild(newLi);
  }
  letterBoxEls = document.querySelectorAll("#letterBoxes ul li");
}

//Function that activates letters buttons
function activate() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].disabled = false;
  }
}

// Function that deactivates the letter buttons when the game ends
function deactivate() {
  for (let i = 0; i < letterButtonEls.length; i++) {
    letterButtonEls[i].disabled = true;
  }
}

// Function that deactivates guessed letter button
function deactivateLetter(letter) {
  for (let i = 0; i < letterButtonEls.length; i++) {
    if (letter === letterButtonEls[i].value) {
      letterButtonEls[i].disabled = true;
    }
  }
}

//Function that shows the result of the game (win or lose);s
function gameResult() {
  if (misses <= 0) {
    gameLose();
    startGameBtnEl.innerHTML = "SPELA IGEN";
  }
  if (lettersFound == selectedWord.length) {
    gameWon();
    startGameBtnEl.innerHTML = "SPELA IGEN";
  }
}

// Function that shows if player wins
function gameWon() {
  informUser(`Bra jobbat! Du har hittat rätt ord - ${selectedWord}`);
  deactivate();
  console.log("Game won.");
  console.log("Thank you for playing!")
}

// Function that shows if player loses
function gameLose() {
  informUser(`Ooops! Titta vem hänger här :) Rätt ord var ${selectedWord}`);
  deactivate();
  console.log("Game lost.")
  console.log("Thank you for playing!")
}

// Function that starts the game
function startGame() {
  console.log("Game start.")
  selectedWord = randomWord(wordList).toUpperCase();
  let wordLenght = selectedWord.length;
  misses = 6;
  guesses = 0;
  lettersFound = 0;
  removeLB();
  activate();
  generateLB(wordLenght);
  setHangManImg(0);
  informUser("");
  document.querySelector("article").style.display = "none";
  startGameBtnEl.innerHTML = "BÖRJA OM";
}
