const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetbtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameIsActive = true;

//All possible winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function checkWin(){
    return winningCombinations.some(([a, b, c]) => {
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
function checkDraw(){
    return board.every(cell => cell !== "");

    
}
function updatePlayerPosition(index){
    board[index]= currentPlayer;
}
function showMove(cell,index){
    cell.textContent = currentPlayer;
}
function playTurn(cell,index){
    updatePlayerPosition(index);
    showMove(cell,index);
}
function showStatusMessage(message){
    statusText.textContent = message;

} 
function switchPlayer(){

    if (currentPlayer==="X"){
        currentPlayer= "O";
    } else {
        currentPlayer= "X";
    }
    showStatusMessage(`It is ${currentPlayer}'s turn`);
}
function endGame(message){
 gameIsActive = false;
 showStatusMessage(message);
}
function checkGameResult(){
    if(checkWin()){
        endGame(`Player ${currentPlayer} wins!`);
    } else if(checkDraw()){
        endGame(`It's a draw!`);
    } else {
        switchPlayer();
    }
}
  function isMoveAllowed(index){
    return board[index]=== "" && gameIsActive
  }
  function oneCellClick(event){
    const index = parseInt(event.target.getAttribute("data-index"));
    if(!isMoveAllowed(index)) return;
        playTurn(event.target, index);
        checkGameResult();
    }

  function resetGame(){
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameIsActive = true;
    cells.forEach((cell) => {
        cell.textContent = "";
    });
    showStatusMessage(`It is ${currentPlayer}'s turn`);
  }
  function setupEventListeners(){
    cells.forEach((cell) => {
        cell.addEventListener("click", oneCellClick);
    });
    resetButton.addEventListener("click", resetGame);
  }
  function startGame(){
    setupEventListeners();
    showStatusMessage(`It's ${currentPlayer}'s turn`);
  }
  startGame();