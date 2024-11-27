// HTML structure for the chessboard
const chessBoard = document.createElement("div");
chessBoard.id = "chess-board";
document.body.appendChild(chessBoard);

// CSS for styling the board and pieces
const style = document.createElement("style");
style.innerHTML = `
  #chess-board {
    display: grid;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
    width: 400px;
    height: 400px;
    border: 2px solid black;
  }
  .square {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
  .black {
    background-color: #769656;
  }
  .white {
    background-color: #eeeed2;
  }
  .piece {
    cursor: pointer;
  }
`;
document.head.appendChild(style);

// JavaScript to create and manage the chessboard
const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙",
};

const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

let currentBoard = JSON.parse(JSON.stringify(initialBoard));

function createBoard() {
  chessBoard.innerHTML = ""; // Clear existing board

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.className = `square ${(i + j) % 2 === 0 ? "white" : "black"}`;
      square.dataset.row = i;
      square.dataset.col = j;

      const piece = currentBoard[i][j];
      if (piece) {
        const pieceElement = document.createElement("span");
        pieceElement.textContent = pieces[piece];
        pieceElement.className = "piece";
        pieceElement.draggable = true;
        pieceElement.addEventListener("dragstart", handleDragStart);
        square.appendChild(pieceElement);
      }

      square.addEventListener("dragover", handleDragOver);
      square.addEventListener("drop", handleDrop);

      chessBoard.appendChild(square);
    }
  }
}

let draggedPiece = null;
let startPosition = null;

function handleDragStart(event) {
  draggedPiece = event.target;
  const { row, col } = draggedPiece.parentElement.dataset;
  startPosition = { row: parseInt(row), col: parseInt(col) };
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  const { row, col } = event.target.dataset;
  const endPosition = { row: parseInt(row), col: parseInt(col) };

  // Update the board if the move is valid
  if (isValidMove(startPosition, endPosition)) {
    currentBoard[endPosition.row][endPosition.col] = currentBoard[startPosition.row][startPosition.col];
    currentBoard[startPosition.row][startPosition.col] = "";
    createBoard();
  }
}

function isValidMove(start, end) {
  // Basic validation: Ensure the start and end positions are different
  if (start.row === end.row && start.col === end.col) return false;

  // Add further validation rules here
  return true;
}

createBoard();
