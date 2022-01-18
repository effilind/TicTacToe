/* TO DO:

* Reset: Ausweiten auf Anzeige und Arrays



*/

/// Factory Function
function players(name, sign, won) {
    const getName = () => name;
    const getSign = () => sign;
    const getWin = () => won;

    return { getName, getSign, getWin }
}

// Arrays
let playerNames = [];
let gameMoves = [];
gameMoves.length = 9;
gameMoves[3] = "X";

// Counter
let counter = 1;

// Reload Game Function
function resetGame() {
    playerNames = [];

    const spielfeld = document.querySelector(".main");
    const startBild = document.querySelector(".eingabe");
    const p1Name = document.querySelector("#spieler1");
    const p2Name = document.querySelector("#spieler2");
    const spielfelder = document.querySelectorAll(".box");

    spielfelder.forEach(item => {
        item.textContent = "";
    })

    gameMoves = [];

    p1Name.value = "";
    p2Name.value = "";
    /*
let startMsg = document.querySelector(".anzeige");
    startMsg.textContent = "";
    */
    // Move to Inputfields
    startBild.classList.remove("hidden");
    spielfeld.classList.add("visibility");
}

// Function Input Check 
function checkInput(player1, player2) {
    if (player1 === '') {
        player1 = document.querySelector("#spieler1");
        player1.value = ("Type a name!");
    } if (player2 === '') {
        player2 = document.querySelector("#spieler2");
        player2.value = ("Type a name!")
    } else {
        // Move to Gameboard
        const main = document.querySelector(".main");
        const input = document.querySelector(".eingabe");
        input.classList.add("hidden");
        main.classList.remove("visibility");
    }
}

// Function Symbole durch Klicken
function clickFields(p1, p2) {
    let fields = document.querySelectorAll(".box");
    fields.forEach(box => {
        box.addEventListener('click', _clickEvent);
    });
}
function _clickEvent(e) {
    box = e.target;
    let pName1 = document.querySelector("#spieler1").value;
    let pName2 = document.querySelector("#spieler2").value;
    let anzeige = document.querySelector(".anzeige");
    if (counter % 2 != 0) {
        anzeige.textContent = `${pName1} - Your turn.`;
        box.textContent = "X";
        gameMoves[box.dataset.index] = box.textContent;
        box.removeEventListener("click", _clickEvent);
        counter++;
        console.log(counter);

        // add win counter
    } else {
        anzeige.textContent = `${pName2} - Your turn.`;
        box.textContent = "O";
        gameMoves[box.dataset.index] = box.textContent;
        box.removeEventListener("click", _clickEvent);
        counter++;
    }
    whoWins();
}


// Funktion zur Überprüfung der Regeln


let winOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function whoWins() {
    winOptions.forEach((item) => {
        if (gameMoves[item[0]] === playerNames[0].getSign() &&
            gameMoves[item[1]] === playerNames[0].getSign() &&
            gameMoves[item[2]] === playerNames[0].getSign()) {
            playerNames[0].won = true;
            determineWinner();
        }
        if (gameMoves[item[0]] === playerNames[1].getSign() &&
            gameMoves[item[1]] === playerNames[1].getSign() &&
            gameMoves[item[2]] === playerNames[1].getSign()) {
            playerNames[1].won = true;
            determineWinner();
        } else {
            determineWinner();
        }
    })
}

// Check Tie Runction

function checkTie(winMsg) {
    const gameFields = document.querySelectorAll(".box");
    let isTie = false;
    let index = 0;

    gameFields.forEach((field) => {
        if (field.textContent != "") {
            index++;
        }
    });
    if (index === 9) {
        isTie = true;
    }
    return isTie;
}




// Announce Winner
function determineWinner() {
    let winMsg = document.querySelector(".anzeige");
    if (playerNames[0].won) {
        winMsg.textContent = `${playerNames[0].getName()} has won the game.`;
        resetGame();
    }
    if (playerNames[1].won) {
        winMsg.textContent = `${playerNames[1].getName()} has won the game.`;
        resetGame();
    } const isTie = checkTie();
    if (isTie === true && !playerNames[0].getWin() && !playerNames[1].getWin()) {
        winMsg.textContent = `Nobody has won - it's a tie!`;
        resetGame();
    }
}


(function init() {
    //Get Input
    const startBtn = document.querySelector(".startbutton");
    const resetBtn = document.querySelector(".restart");

    //Event-Listener Start
    startBtn.addEventListener("click", () => {
        // Get Input
        const player1 = document.querySelector('#spieler1').value;
        const player2 = document.querySelector('#spieler2').value;

        checkInput(player1, player2);
        let p1 = players(player1, 'X', false);
        console.log(p1);
        playerNames.push(p1);
        let p2 = players(player2, 'O', false);
        playerNames.push(p2);

        clickFields(p1, p2);
    })

    resetBtn.addEventListener("click", () => {
        const gameBoardMain = document.querySelector(".main");
        const inputField = document.querySelector(".eingabe");

        // Move to Input
        inputField.classList.remove("hidden");
        gameBoardMain.classList.add("visibility");

        const input1 = document.querySelector("#spieler1");
        const input2 = document.querySelector("#spieler2");

        input1.value = "";
        input2.value = "";

        // Reset Array
        playerNames = [];
        gameMoves = [];

    })



})();