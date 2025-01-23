import React, { useState } from "react";
import "./Board.css";

export default function Board() {
  const [board, setBoard] = useState(Array(5).fill().map(() => Array(5).fill(null)));
  const [currentTurn, setCurrentTurn] = useState(0);

  const characters = ["C", "M", "T"];

  const handleClick = (row,col) => {
    if (board[row][col] !== null) return;

    const newBoard = board.map((r, rowIndex) =>
                      r.map((cell, colIndex) => 
                        (rowIndex === row && colIndex === col ? characters[currentTurn] : cell))
    );

    setBoard(newBoard);
    setCurrentTurn((currentTurn + 1) % 3);
  }

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
