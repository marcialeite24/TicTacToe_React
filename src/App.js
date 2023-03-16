import './App.css';
import { useState } from 'react';
import Square from "./components/square";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const [bot, setBot] = useState(true);
  const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  
  let status;

  // Selecting the square
  const chooseSquare = (square) => {
    if (checkWin(board) || board[square]) {
      return;
    }
    board[square] = player ? 'X' : 'O';
    setBoard(board);    
    setPlayer(!player); 

    // random delay for computer to play
    let delay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout (() => {        
      botChooseSquare(!player);
    }, delay);  
  };
   
  // Bot selecting the square
  const botChooseSquare = (player) => {
    if (checkWin(board)) {
      return;
    }
    // seeing what cells are still empty
    let array = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] == null) {
          array.push(i);
      }
    }
    // random number so the computer select a random cell
    let randomCell = array[Math.floor(Math.random() * array.length)];
    board[randomCell] = player ? 'X' : 'O';
    setBoard(board);    
    setPlayer(!player); 
    setBot(!bot);
  };

  // Checking the winner
  const checkWin = () => {
    for (let i = 0; i < winningPositions.length; i++) {
      const winPosition = winningPositions[i];
      const a = board[winPosition[0]];
      const b = board[winPosition[1]];
      const c = board[winPosition[2]];      
      if (a === null || b === null || c === null) {
        continue;
      }
      if (a === b && b === c) {
        return a;
      } 
    }
    return null;  
  };

  // Checking if it was a tie
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === null) {
        filled = false;
      }
    })

    if (filled) {
      status = `Match has been drawn!`;
      return null;
    }
  };
  
  const winner = checkWin(board);
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = 'Next player: ' + (player ? 'X' : 'O');
    checkIfTie();
  }

  // Restarting the game
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer(true);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Tic Tac Toe</h1>
        <div className="board">
          <div className="row">
            <Square 
              val={board[0]}
              chooseSquare={() => {
                chooseSquare(0);
              }}
            />
            <Square 
              val={board[1]}
              chooseSquare={() => {
                chooseSquare(1);
              }}
            />
            <Square 
              val={board[2]}
              chooseSquare={() => {
                chooseSquare(2);
              }}
            />
          </div>
          <div className="row">
            <Square 
              val={board[3]}
              chooseSquare={() => {
                chooseSquare(3);
              }}
            />
            <Square 
              val={board[4]}
              chooseSquare={() => {
                chooseSquare(4);
              }}
            />
            <Square 
              val={board[5]}
              chooseSquare={() => {
                chooseSquare(5);
              }}
            />
          </div>
          <div className="row">
          <Square 
              val={board[6]}
              chooseSquare={() => {
                chooseSquare(6);
              }}
            />
            <Square 
              val={board[7]}
              chooseSquare={() => {
                chooseSquare(7);
              }}
            />
            <Square 
              val={board[8]}
              chooseSquare={() => {
                chooseSquare(8);
              }}
            />
          </div>
        </div>        
        <div className="winnerBox">
          <div className="status">{status}</div>        
          <button className="resetButton" onClick={restartGame}>Reset</button>
        </div>  
      </div>
    </div>
  );
}

export default App;