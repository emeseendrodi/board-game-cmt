import React, { useState } from "react";
import "./Board.css";

export default function Board() {
  const [board, setBoard] = useState(Array(5).fill().map(() => Array(5).fill(null)));
  const [currentTurn, setCurrentTurn] = useState(0);

  const characters = ["C", "M", "T"];


  const checkLines = (board) => {
    let lineCount = 0;
  
    // Check horizontal lines
    for (let row = 0; row < 5; row++) {
      let currentChar = null;
      let count = 0;
  
      for (let col = 0; col < 5; col++) {
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
        } else {
          if (count >= 3) {
            lineCount++;
          }
          currentChar = board[row][col];
          count = 1; // reset counter for new character
        }
      }
  
      if (count >= 3) {
        lineCount++;
      }
    }
  
    // Check vertical lines
    for (let col = 0; col < 5; col++) {
      let currentChar = null;
      let count = 0;
  
      for (let row = 0; row < 5; row++) {
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
        } else {
          if (count >= 3) {
            lineCount++;
          }
          currentChar = board[row][col];
          count = 1;
        }
      }
  
      if (count >= 3) {
        lineCount++;
      }
    }
  
    // Check diagonals (top-left to bottom-right)
    for (let startRow = 0; startRow < 5; startRow++) {
      let currentChar = null;
      let count = 0;
      for (let d = 0; d + startRow < 5; d++) {
        const row = startRow + d;
        const col = d;
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
        } else {
          if (count >= 3) {
            lineCount++;
          }
          currentChar = board[row][col];
          count = 1;
        }
      }
      if (count >= 3) {
        lineCount++;
      }
    }
  
    for (let startCol = 1; startCol < 5; startCol++) {
      let currentChar = null;
      let count = 0;
      for (let d = 0; d + startCol < 5; d++) {
        const row = d;
        const col = startCol + d;
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
        } else {
          if (count >= 3) {
            lineCount++;
          }
          currentChar = board[row][col];
          count = 1;
        }
      }
      if (count >= 3) {
        lineCount++;
      }
    }
  
    // Check diagonals (top-right to bottom-left)
    for (let startRow = 0; startRow < 5; startRow++) {
      let currentChar = null;
      let count = 0;
      for (let d = 0; d + startRow < 5; d++) {
        const row = startRow + d;
        const col = 4 - d;
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
        } else {
          if (count >= 3) {
            lineCount++;
          }
          currentChar = board[row][col];
          count = 1;
        }
      }
      if (count >= 3) {
        lineCount++;
      }
    }
  
    for (let startCol = 3; startCol >= 0; startCol--) {
      let currentChar = null;
      let count = 0;
      for (let d = 0; d + 4 - startCol < 5; d++) {
        const row = d;
        const col = startCol - d;
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
        } else {
          if (count >= 3) {
            lineCount++;
          }
          currentChar = board[row][col];
          count = 1;
        }
      }
      if (count >= 3) {
        lineCount++;
      }
    }
  
    console.log(lineCount); // Logs the total number of lines
    
  };
  
  
  
  
  const handleClick = (row, col) => {
    if (board[row][col] !== null) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => 
        (rowIndex === row && colIndex === col ? characters[currentTurn] : cell)) 
    );

    setBoard(newBoard);
    setCurrentTurn((currentTurn + 1) % 3);

    checkLines(newBoard);
  }
 
  //Resets the board anytime
  const resetGame = () =>{
    setBoard(Array(5).fill().map(() => Array(5).fill(null)));
    setCurrentTurn(0);
  }

  return (
    <div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell ? "filled-cell" : ""}`}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <div className="controls">
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}
