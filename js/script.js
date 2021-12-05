// Array: med spelets alla ord
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
  ];
  
  // Array: med hangman images 
  const imgList = [
    "img/h0.png",
    "img/h1.png",
    "img/h2.png",
    "img/h3.png",
    "img/h4.png",
    "img/h5.png",
    "img/h6.png",
  ];
  
  // Array: med messages när spelaren gissar fel
  const messageList = [
    "Vill du hänga lite?",
    "Det är inte jag som ska hänga här.",
    "Hallo! Vakna!",
    "Fel, Fel, Fel.",
    "Googla?))",
    "Bravo. Det är helt ... fel."
  ]
  
  
  let selectedWord;     // Sträng: ett av orden valt av en slumpgenerator från areyen ovan
  let misses = 6;       // Max antal fel som spelaren få göra
  let guesses = 0;      // Number: håller antalet gissningar som gjorts
  let hangmanImg;       // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
  let guessedLetterCount;
  let msgHolderEl = document.querySelector("#message");     // DOM-nod: Ger meddelande när spelet är över
  let startGameBtnEl = document.querySelector("#startGameBtn");     // DOM-nod: knappen som du startar spelet med
  let letterButtonEls = document.querySelectorAll("#letterButtons button");     // Array av DOM-noder: Knapparna för bokstäverna
  let letterBoxEls = document.querySelectorAll("#letterBoxes ul li");     // Array av DOM-noder: Rutorna där bokstäverna ska stå
  let letterBoxContainerEl = document.querySelector("#letterBoxes ul");
  let letterButtonContainerEl = document.querySelector("ul#letterButtons");
  let hangmanImgEl = document.querySelector("#hangman");
  
  startGameBtnEl.addEventListener("click", startGame);
  
  letterButtonContainerEl.addEventListener("click", guessLetter);
  
  //Funktion som meddelar användaren någonting.
  function informUser(message) {
    msgHolderEl.innerText = message;
  }
  
  // Funktion som körs när du trycker på bokstäverna och gissar bokstav
  function guessLetter(e) {
    let lastGuessCorrect;
  
    if (e.target.tagName !== "BUTTON") {
      return;
    }
    console.log(e.target.value);
    let guessedLetter = e.target.value;
    deactivateLetter(guessedLetter); // Avaktiverar bokstaven spelaren tryckt på
  
    const indexOfFirst = selectedWord.indexOf(guessedLetter);
    console.log("first occurence at " + indexOfFirst);
    if (indexOfFirst < 0) {
      // Spelaren gissade fel
      lastGuessCorrect = false;
      misses--;
      guesses = guesses + 1;
      setHangManImg(guesses);
      gameStatus(lastGuessCorrect);
      if (misses > 0) {
        informUser(`${messagePhrase(messageList)} Det är ${misses} misstag kvar`);
      }
      return;
    } else {
      // Bokstav hittad
      lastGuessCorrect = true;
      letterBoxEls[indexOfFirst].firstElementChild.value = guessedLetter;
      guessedLetterCount++;
      gameStatus(lastGuessCorrect);
    }
  
    const indexOfSecond = selectedWord.indexOf(guessedLetter, indexOfFirst + 1);
    if (indexOfSecond < 0) {
      return;
    } else {
      letterBoxEls[indexOfSecond].firstElementChild.value = guessedLetter;
      guessedLetterCount++;
      gameStatus(lastGuessCorrect);
    }
    console.log("second occurence at " + indexOfSecond);
  }
  
  //funktion som uppdaterar bilden när man gör ett fel
  function setHangManImg(index) {
    hangmanImg = imgList[index];
    hangmanImgEl.setAttribute("src", hangmanImg);
  }
  
  // funktion som väljer ett ord slumpmässigt
  function randomWord(wordList) {
    const randomNumber = Math.floor(Math.random() * wordList.length);
    return wordList[randomNumber];
  }
  
  function messagePhrase(messageList) {
    const randomMessageNumber = Math.floor(Math.random() * messageList.length);
    return messageList[randomMessageNumber];
  }
  
  //Funktion som tar rensar bokstavsrutorna
  function removeLB() {
    letterBoxContainerEl.innerHTML = "";
  }
  
  // Funktion som tar fram antal bokstavsrutor beror på random
  function generateLB(amount) {
    for (let i = 0; i < amount; i++) {
      let newLi = document.createElement("li");
      newLi.innerHTML = '<input type="text" disabled value="&nbsp;"/>';
      letterBoxContainerEl.appendChild(newLi);
    }
    letterBoxEls = document.querySelectorAll("#letterBoxes ul li");
  }
  
  //Funktion som aktiverar bokstavsknapparna
  function activate() {
    for (let i = 0; i < letterButtonEls.length; i++) {
      letterButtonEls[i].disabled = false;
    }
  }
  // Funktion som inaktiverar bokstavsnknapparna när spelet sluts
  function deactivate() {
    for (let i = 0; i < letterButtonEls.length; i++) {
      letterButtonEls[i].disabled = true;
    }
  }
  // Funktion som avaktiverar gissade bokstaver
  function deactivateLetter(letter) {
    for (let i = 0; i < letterButtonEls.length; i++) {
      if (letter === letterButtonEls[i].value) {
        letterButtonEls[i].disabled = true;
      }
    }
  }
  
  //Funktion som håller reda ifall spelaren vunnit / förlorat
  function gameStatus(lastGuessCorrect) {
    if (hangmanImgEl.src.slice(-6) === "h6.png" && !lastGuessCorrect) {
      gameLose();
      startGameBtnEl.innerHTML = "SPELA IGEN";
    }
    if (lastGuessCorrect && selectedWord.length === guessedLetterCount) {
      gameWon();
      startGameBtnEl.innerHTML = "SPELA IGEN";
    }
  }
  // Funktion som meddelar spelaren om vinst
  function gameWon() {
    informUser(`Bra jobbat! Du har hittat rätt ord - ${selectedWord}`);
    deactivate();
  }
  
  // Funktion som meddelar spelaren om förlust
  function gameLose() {
    informUser(`Ooops! Titta vem hänger här :) Rätt ord var ${selectedWord}`);
    deactivate();
  }
  
  // Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
  function startGame() {
    misses = 6;
    guesses = 0;
    guessedLetterCount = 0;
    selectedWord = randomWord(wordList).toUpperCase();
    let wordLenght = selectedWord.length;
    removeLB();
    activate();
    generateLB(wordLenght);
    setHangManImg(0);
    informUser("");
    document.querySelector("article").style.display = "none";
    startGameBtnEl.innerHTML = "BÖRJA OM";
  }