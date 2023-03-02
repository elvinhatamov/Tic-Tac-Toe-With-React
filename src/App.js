 import {useState} from "react"
 
 function Square({value, onSquareClick}){

  return (
  <button className="square"
  onClick={onSquareClick}>{value}</button>
  )

 }
 
 function Board({xIsNext, squares, onPlay}) {
  

function handleClick(i){
  if(calculateWinner(squares) || squares[i]){
    return;
  }
  const nextSquares = squares.slice();
  if(xIsNext){
    nextSquares[i] = "X"
  }else{
    nextSquares[i]= "O"
  }
  
  onPlay(nextSquares)
}
const winner = calculateWinner(squares);
let status;
if(winner){
  status= "Winner: " + winner;
}else{
  status = "Next player: " + (xIsNext ? "X":"O")
}
const boardSize = 3;
const board = [];
for (let i = 0;i<boardSize;i++){
  const row = [];
  for(let j = 0;j<boardSize;j++){
    const index = i*boardSize + j;
    row.push(<Square key={index} value={squares[index]} onSquareClick={()=>handleClick(index)}/>)
  }
  board.push(<div className="board-row" key={i}>{row}</div>)
}
  return (<>
  <div className="status">{status}</div>
  <div className="board-row">
  {board}
  </div>

  </>)
  ;
}
function Game(){
  
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [curretnMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = curretnMove % 2 ===0;
  const currentSquares = history[curretnMove]
 
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, curretnMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1)
   
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);

  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    
    return (
      <li key={move}>
        <form onClick={() => jumpTo(move)}>{description}</form>
      </li>
    );
  });
  if(!isAscending){
    moves.reverse();
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares = {currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
       
        <button onClick={()=> setIsAscending(!isAscending)}>{isAscending ? "Sort Descending" : "Sort Ascending"}</button>
        <ol>{moves}</ol>
      </div>
    </div>
  )
 }

function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i< lines.length;i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  return null;
}



export default Game;
