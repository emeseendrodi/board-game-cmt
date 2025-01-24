import React, { useState } from "react";
import "./Board.css";

export default function Board() {
  const [board, setBoard] = useState(Array(5).fill().map(() => Array(5).fill(null)));
  const [currentTurn, setCurrentTurn] = useState(0);
  const [message, setMessage] = useState("");
  const [highlightedCells, setHighlightedCells] = useState([]);

  const characters = ["C", "M", "T"];

  const checkLines = (board) => {
    let lineCount = 0;
    const lines = [];

    const addHighlight = (coords, char) => {
      lineCount++;
      lines.push({ coords, char });
    };

    // Check horizontal lines
    for (let row = 0; row < 5; row++) {
      let currentChar = null;
      let count = 0;
      let coords = [];

      for (let col = 0; col < 5; col++) {
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
          coords.push([row, col]);
        } else {
          if (count >= 3) addHighlight(coords, currentChar);
          currentChar = board[row][col];
          coords = [[row, col]];
          count = 1;
        }
      }
      if (count >= 3) addHighlight(coords, currentChar);
    }

    // Check vertical lines
    for (let col = 0; col < 5; col++) {
      let currentChar = null;
      let count = 0;
      let coords = [];

      for (let row = 0; row < 5; row++) {
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
          coords.push([row, col]);
        } else {
          if (count >= 3) addHighlight(coords, currentChar);
          currentChar = board[row][col];
          coords = [[row, col]];
          count = 1;
        }
      }
      if (count >= 3) addHighlight(coords, currentChar);
    }

    // Check diagonals (top-left to bottom-right)
    for (let startRow = 0; startRow < 5; startRow++) {
      let currentChar = null;
      let count = 0;
      let coords = [];
      for (let d = 0; d + startRow < 5; d++) {
        const row = startRow + d;
        const col = d;
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
          coords.push([row, col]);
        } else {
          if (count >= 3) addHighlight(coords, currentChar);
          currentChar = board[row][col];
          coords = [[row, col]];
          count = 1;
        }
      }
      if (count >= 3) addHighlight(coords, currentChar);
    }

    for (let startCol = 1; startCol < 5; startCol++) {
      let currentChar = null;
      let count = 0;
      let coords = [];
      for (let d = 0; d + startCol < 5; d++) {
        const row = d;
        const col = startCol + d;
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
          coords.push([row, col]);
        } else {
          if (count >= 3) addHighlight(coords, currentChar);
          currentChar = board[row][col];
          coords = [[row, col]];
          count = 1;
        }
      }
      if (count >= 3) addHighlight(coords, currentChar);
    }

    // Check diagonals (top-right to bottom-left)
    for (let startRow = 0; startRow < 5; startRow++) {
      let currentChar = null;
      let count = 0;
      let coords = [];
      for (let d = 0; d + startRow < 5; d++) {
        const row = startRow + d;
        const col = 4 - d;
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
          coords.push([row, col]);
        } else {
          if (count >= 3) addHighlight(coords, currentChar);
          currentChar = board[row][col];
          coords = [[row, col]];
          count = 1;
        }
      }
      if (count >= 3) addHighlight(coords, currentChar);
    }

    for (let startCol = 3; startCol >= 0; startCol--) {
      let currentChar = null;
      let count = 0;
      let coords = [];
      for (let d = 0; d + 4 - startCol < 5; d++) {
        const row = d;
        const col = startCol - d;
        if (board[row][col] === currentChar && currentChar !== null) {
          count++;
          coords.push([row, col]);
        } else {
          if (count >= 3) addHighlight(coords, currentChar);
          currentChar = board[row][col];
          coords = [[row, col]];
          count = 1;
        }
      }
      if (count >= 3) addHighlight(coords, currentChar);
    }

    return { lineCount, lines };
  };

  const handleClick = (row, col) => {
    if (board[row][col] !== null) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? characters[currentTurn] : cell
      )
    );

    setBoard(newBoard);
    setCurrentTurn((currentTurn + 1) % 3);

    const { lineCount, lines } = checkLines(newBoard);
    setHighlightedCells(lines.flatMap((line) => line.coords));

    const isBoardFull = newBoard.every((row) => row.every((cell) => cell !== null));
    if (isBoardFull) {
      setMessage(
        lineCount > 0
          ? `Congratulations, you have ${lineCount} ${lineCount === 1 ? "line" : "lines"}!`
          : "You have no lines, try again!"
      );
    }
  };

  const resetGame = () => {
    setBoard(Array(5).fill().map(() => Array(5).fill(null)));
    setCurrentTurn(0);
    setMessage("");
    setHighlightedCells([]);
  };

  return (
    <div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isHighlighted = highlightedCells.some(
              ([r, c]) => r === rowIndex && c === colIndex
            );
            const highlightClass = isHighlighted
              ? cell === "C"
                ? "highlight-c"
                : cell === "M"
                ? "highlight-m"
                : "highlight-t"
              : "";
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${highlightClass} ${cell ? "filled-cell" : ""}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            );
          })
        )}
      </div>
      <div className="controls">
        <button onClick={resetGame}>Reset</button>
        <div className="message">{message}</div>
      </div>
    </div>
  );
}
