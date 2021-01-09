let BODY = document.querySelector("body");
let playerOne;
let playerTwo;
let turn = 0;
let winningScores = [6, 60, 600, 111, 222, 333, 123, 321];
//I create the elements to ask the name of the players
let inputs = document.createElement("section");
inputs.className = "inputs";
let gameName = document.createElement("h1");
gameName.innerText = "Tic Tac Toe";
let msg = document.createElement("p");
msg.innerText = "Introduzca el nombre de los jugadores y empiece a ¡jugar!";
let inputOne = document.createElement("input");
let inputTwo = document.createElement("input");
inputOne.placeholder = "Nombre del jugador 1";
inputTwo.placeholder = "Nombre del jugador 2";
let submit = document.createElement("button");
submit.innerText = "¡Empezar a jugar!";
submit.id = "submit";

// I append the elements in to the body
BODY.appendChild(gameName);
BODY.appendChild(inputs);
inputs.appendChild(msg);
inputs.appendChild(inputOne);
inputs.appendChild(inputTwo);
inputs.appendChild(submit);

submit = document.querySelector("#submit");
submit.addEventListener("click", namesVerification);

function namesVerification() {
    playerOne = inputOne.value;
    playerTwo = inputTwo.value;
    if (playerOne && playerTwo) {
        createBoard();
        inputs.remove();
    }
}

function createBoard(boardSize = 3) {
    let board = document.createElement("section");
    board.id = "board";
    let playerTurn = document.createElement("p");
    playerTurn.id = "playerTurn";
    playerTurn.innerText = "Es el turno de " + playerOne;
    BODY.appendChild(board);
    board.appendChild(playerTurn);
    for (let i = 0; i < boardSize; i++) {
        let multiplier = 1;
        if (i === 1)
            multiplier = 10;
        if (i === 2)
            multiplier = 100;
        let row = document.createElement("div");
        row.className = "row";
        board.appendChild(row);
        for (j = 0; j < boardSize; j++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.value = multiplier * (j + 1);
            row.appendChild(cell);
        }
    }
    // elements to control the click of cells
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", printCircle);
    }
}


function printCircle() {
    if (turn % 2 === 0) {
        let img = document.createElement("img");
        this.dataset.player = "player1";
        img.src = "img/playerOne.svg";
        this.appendChild(img);
    } else {
        let img = document.createElement("img");
        this.dataset.player = "player2";
        img.src = "img/playerTwo.svg";
        this.appendChild(img);
    }
    this.removeEventListener("click", printCircle);
    let winner = winnerVerification();
    if (winner){
        let playerTurn = document.querySelector("#playerTurn");
        playerTurn.innerText="ganador " + winner;
        let cells = document.querySelectorAll(".cell");
        for (let index = 0; index < cells.length; index++) {
            cells[index].removeEventListener("click",printCircle);
        }
        return;

    }else{
        changeTurn();
    }

}

function changeTurn() {
    let playerTurn = document.querySelector("#playerTurn");
    if (turn % 2 === 0) {
        playerTurn.innerText = "Es el turno de " + playerTwo;
    } else {
        playerTurn.innerText = "Es el turno de " + playerOne;
    }
    turn++;
}

function winnerVerification() {
    let cells = document.querySelectorAll(".cell");
    let cellsPlayerOne = [];
    let cellsPlayerTwo = [];
    for (let i = 0; i < cells.length; i++) {
        let player = cells[i].dataset.player;
        let value = cells[i].dataset.value;
        if (player === "player1")
            cellsPlayerOne.push(value);
        if (player === "player2")
            cellsPlayerTwo.push(value);
    }
    //console.log(cellsPlayerOne);
    //console.log(cellsPlayerTwo);

    if (cellsPlayerOne.length > 2) {
        for (let i = 0; i < cellsPlayerOne.length; i++) {
            for (let j = 1 + i; j < cellsPlayerOne.length; j++) {
                for (let k = 1 + j; k < cellsPlayerOne.length; k++) {
                    let puntucionPlayerOne = (parseInt(cellsPlayerOne[i]) + parseInt(cellsPlayerOne[j]) + parseInt(cellsPlayerOne[k]));
                    console.log(puntucionPlayerOne);
                    if (winningScores.includes(puntucionPlayerOne))
                        return "player1";
                }
            }
        }
    }
    if (cellsPlayerTwo.length > 2) {
        for (let i = 0; i < cellsPlayerTwo.length; i++) {
            for (let j = 1 + i; j < cellsPlayerTwo.length; j++) {
                for (let k = 1 + j; k < cellsPlayerTwo.length; k++) {
                    let puntucionPlayerTwo = (parseInt(cellsPlayerTwo[i]) + parseInt(cellsPlayerTwo[j]) + parseInt(cellsPlayerTwo[k]));
                    if (winningScores.includes(puntucionPlayerTwo))
                        return "player2";
                }
            }
        }

    }
    return false;
}