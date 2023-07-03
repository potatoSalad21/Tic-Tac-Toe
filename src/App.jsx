import { useState } from "react";
import "./styles.css";

function calculateWinner(cells) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
}

function Square({ value, onSquareClick }) {
  return (  
    <button className="cell" onClick={onSquareClick}>{value}</button>
  );
}

export default function Board() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  function handleClick(cellNum) {
    if (cells[cellNum] || calculateWinner(cells)) return;

    const newCells = [...cells];
    (xIsNext) ? newCells[cellNum] = "X" : newCells[cellNum] = "O";

    setCells(newCells);
    setXisNext(!xIsNext);
  }

  let outcome;
  const winner = calculateWinner(cells);

  if (winner) {
    outcome = "Winner is: " + winner;
  } else {
    outcome = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h2 className="outcome">{outcome}</h2>
      <div className="board-row">
        <Square value={cells[0]} onSquareClick={() => handleClick(0)} />
        <Square value={cells[1]} onSquareClick={() => handleClick(1)} />
        <Square value={cells[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={cells[3]} onSquareClick={() => handleClick(3)} />
        <Square value={cells[4]} onSquareClick={() => handleClick(4)} />
        <Square value={cells[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={cells[6]} onSquareClick={() => handleClick(6)} />
        <Square value={cells[7]} onSquareClick={() => handleClick(7)} />
        <Square value={cells[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}