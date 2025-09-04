// Select all 9 grid cells (elements with class="cell")
const cells = document.querySelectorAll(".cell");

// Select the element that shows messages like "X's turn" / "Player X wins!"
const statusText = document.getElementById("status");

// Select the Reset button
const resetButton = document.getElementById("resetbtn");

// 3×3 board represented as a flat array of 9 strings ("" means empty)
let board = ["", "", "", "", "", "", "", "", ""];

// Current player marker — starts with "X"
let currentPlayer = "X";

// Flag to stop interaction once someone wins or it's a draw
let gameIsActive = true;

// All index triplets that form a winning line on the board
const winningCombinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // main diagonal
  [2, 4, 6]  // anti-diagonal
];

// Returns true if any winning triplet has the same non-empty symbol
function checkWin(){
    return winningCombinations.some(([a, b, c]) => {
        // A win exists if board[a] is not empty AND a==b==c
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Returns true if all 9 cells are filled and nobody has won
function checkDraw(){
    return board.every(cell => cell !== "");
}

// Writes the current player's symbol into the board array at index
function updatePlayerPosition(index){
    board[index] = currentPlayer;
}

// Renders the move on the clicked cell in the UI
function showMove(cell, index){
    cell.textContent = currentPlayer;
}

// One full turn: update the data model, then update the UI
function playTurn(cell, index){
    updatePlayerPosition(index);
    showMove(cell, index);
}

// Helper to display a status message to the user
function showStatusMessage(message){
    statusText.textContent = message;
} 

// Toggles current player from X→O or O→X and updates the status text
function switchPlayer(){
    if (currentPlayer === "X"){
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    showStatusMessage(`It is ${currentPlayer}'s turn`);
}

// Ends the game (prevents further moves) and shows the final message
function endGame(message){
    gameIsActive = false;
    showStatusMessage(message);
}

// After each move, check whether it's a win, a draw, or continue playing
function checkGameResult(){
    if (checkWin()){
        endGame(`Player ${currentPlayer} wins!`);
    } else if (checkDraw()){
        endGame(`It's a draw!`);
    } else {
        switchPlayer();
    }
}

// Returns true if the chosen cell is empty AND the game hasn't ended
function isMoveAllowed(index){
    return board[index] === "" && gameIsActive;
}

// Click handler for each cell
function oneCellClick(event){
    // Each .cell must have a data-index="0..8" attribute
    const index = parseInt(event.target.getAttribute("data-index"));
    if (!isMoveAllowed(index)) return;      // ignore clicks on filled cells or after game end
    playTurn(event.target, index);          // record & display the move
    checkGameResult();                      // evaluate game state
}

// Resets everything back to the initial state
function resetGame(){
    board = ["", "", "", "", "", "", "", "", ""]; // clear model
    currentPlayer = "X";                           // X starts
    gameIsActive = true;                           // allow moves
    cells.forEach((cell) => {                      // clear UI
        cell.textContent = "";
    });
    showStatusMessage(`It is ${currentPlayer}'s turn`);
}

// Hook up event listeners (cell clicks + reset button)
function setupEventListeners(){
    cells.forEach((cell) => {
        cell.addEventListener("click", oneCellClick);
    });
    resetButton.addEventListener("click", resetGame);
}

// Initialize the game on page load
function startGame(){
    setupEventListeners();
    showStatusMessage(`It's ${currentPlayer}'s turn`);
}

// Bootstraps the game immediately when this script loads
startGame();
