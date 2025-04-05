let playerText=document.getElementById('playerText')
let restartbtn=document.getElementById('restartBtn')
let boxes =Array.from (document.getElementsByClassName('box'))
let winnercolor=getComputedStyle(document.body).getPropertyValue('--winnercolor')
const X_COLOR= "#f6f1f1"
const Y_COLOR="#f6f1f1"
const O_TEXT="O"
const X_TEXT="X"
let currentPlayer=X_TEXT
let spaces=Array(9).fill(null)
let gameActive=true

const startGame=() => {
    boxes.forEach(box=> box.addEventListener('click',boxClicked))

}
function boxClicked(e){
    const id = e.target.id
    
    if(!spaces[id]&& gameActive){
        spaces[id]=currentPlayer
        e.target.innerText=currentPlayer
        if(currentPlayer==X_TEXT){
            e.target.style.color=X_COLOR
        }
        else{
            e.target.style.color=Y_COLOR
        }
        if(playerHasWon()!==false){
            playerText.style.color=winnercolor
            playerText.innerText=`${currentPlayer} has won!`
            let winning_blocks=playerHasWon()
            restartbtn.style.color=winnercolor
            winning_blocks.map(box => boxes[box].style.color=winnercolor)
           gameActive=false

        }
        if(!spaces.includes(null)){
            playerText.style.color=winnercolor
            playerText.innerText="It's a draw!"
            restartbtn.style.color=winnercolor
        }
        currentPlayer=currentPlayer == X_TEXT ? O_TEXT:X_TEXT
    
    }
}
const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]
function playerHasWon(){
    for(const condition of winningCombos){
        let [a,b,c]=condition
        if(spaces[a]&& (spaces[a]==spaces[b] && spaces[a]==spaces[c])){
            return [a,b,c]
        }

    }
  return false
}
restartbtn.addEventListener('click',restart)
function restart(){
    spaces.fill(null)
    boxes.forEach(box => { 
        box.innerText=''
        box.style.backgroundColor=''
    })
    playerText.innerText='Tic Tac Toe'
    playerText.style.color=''
    restartbtn.style.color=''
    currentPlayer=X_TEXT
    gameActive=true
}
startGame()