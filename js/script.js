// Globala variabler


const wordList = ["flygplan", "universum", "tunnelbana", "fisk", "krokodil", "kärlek", "webbutveckling", "julgran" ];    // Array: med spelets alla ord
const startButton = document.querySelector(button)[0];
function randomNumber() {
    return Math.floor(Math.random() * wordList.length);
}

startButton.onclick = function () {
    document.querySelector(btn)[0].setAttribute("value", "disabled");
    document.getElementsByTagName("sector").style.display = "inline";
    let selectedWord = wordList[randomNumber()] // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

}



let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`


let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
// Funktion som slumpar fram ett ord
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på