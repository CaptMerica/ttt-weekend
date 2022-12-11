/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [6, 7, 8],
  [3, 4, 5]
]


/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, tie

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr")
const messageEl = document.getElementById("message")
const resetBtnEl = document.querySelectorAll(".reset")
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => square.addEventListener("click", handleclick))
resetBtnEl.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/
init ()
function init(){
  board = [null, null, null, null, null, null, null, null]
  turn = 1
  winner = false
  tie = false
  render()
}
console.log(init);

function handleclick(evt){
  console.log("test!!!", evt.target.id)
  const sqIdx = evt.target.id.slice(2)
  console.log("blahhhhhhh", sqIdx)
   if(board[sqIdx] !== null){
    return 
   }
   if (winner === true){
    return
   }
   placePiece(sqIdx)
   checkForTie()
   checkforWinner()
   switchPlayerTurn()
   render()
  }


  function placePiece(idx){
    board[idx] = turn
   }
   
   function checkForTie(){
     if (!board.includes(null)){
       tie = true
     }
   }
   
   function checkforWinner(){
     for(let i = 0; i < winningCombos.length; i++){
       if (Math.abs(
         board[winningCombos[i][0]] +
         board[winningCombos[i][1]] +
         board[winningCombos[i][2]]
       ) === 3 ) {
         winner = true
       }
     } 
   }
   
   function switchPlayerTurn (){
     if (winner === true){
       return
     }
     turn *= -1
   }

  function render(){
  updateBoard()
  updateMessage()
  console.log(board);
}

function updateBoard(){
  board.forEach((sqr, i) => {
    if (sqr === 1){
      squareEls[i].textContent = "X"
    } 
    if (sqr === -1) {
      squareEls[i].textContent = "O"
    }
    if (sqr === null) {
      squareEls[i].textContent = ""
    }
  
  })
}    

function updateMessage(){
  if (!winner && !tie) {
    if (turn > 0){
      messageEl.textContent = `It's X's turn.`
    } else {
      messageEl.textContent = `It's O's turn`
    }
  } else if (!winner && tie) {
    messageEl.textContent = "Tie!!"
  } else {
    if(turn > 0){
      messageEl.textContent = "Player X wins!"
    } else {
      messageEl.textContent = "Player O wins!"
    }
  }
}


// Step 7 - Create Reset functionality

  // 7a) Add a reset button to the HTML document.

  // 7b) Store the new reset button element as a cached element reference in
  //     a constant named `resetBtnEl`.

  // 7c) Attach an event listener to the `resetBtnEl`. On the `'click'` event 
  //     it should call the `init` function you created in step 3.