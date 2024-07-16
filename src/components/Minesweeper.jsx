import React, { useState, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";

const BOARD_SIZE = 8;
const MINE_COUNT = 8;

const Minesweeper = ({ onClose }) => {
  const createEmptyBoard = () =>
    Array(BOARD_SIZE)
      .fill()
      .map(() =>
        Array(BOARD_SIZE)
          .fill()
          .map(() => ({
            isMine: false,
            isRevealed: false,
            neighborCount: 0,
            isFlagged: false,
          })),
      );

  const [board, setBoard] = useState(createEmptyBoard);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  const initializeBoard = useCallback((clickedRow, clickedCol) => {
    let newBoard = createEmptyBoard();
    let minesPlaced = 0;

    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);

      if (
        !newBoard[row][col].isMine &&
        (row !== clickedRow || col !== clickedCol)
      ) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
              if (
                row + r >= 0 &&
                row + r < BOARD_SIZE &&
                col + c >= 0 &&
                col + c < BOARD_SIZE &&
                newBoard[row + r][col + c].isMine
              ) {
                count++;
              }
            }
          }
          newBoard[row][col].neighborCount = count;
        }
      }
    }

    return newBoard;
  }, []);

  const revealCell = (row, col) => {
    if (
      gameOver ||
      win ||
      board[row][col].isRevealed ||
      board[row][col].isFlagged
    )
      return;

    let newBoard = [...board];
    if (firstClick) {
      newBoard = initializeBoard(row, col);
      setFirstClick(false);
      setTimerInterval(setInterval(() => setTimer((t) => t + 1), 1000));
    }

    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].isMine) {
      setGameOver(true);
      clearInterval(timerInterval);
      return;
    }

    if (newBoard[row][col].neighborCount === 0) {
      const revealQueue = [{ r: row, c: col }];
      while (revealQueue.length > 0) {
        const { r, c } = revealQueue.shift();
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = r + i;
            const newCol = c + j;
            if (
              newRow >= 0 &&
              newRow < BOARD_SIZE &&
              newCol >= 0 &&
              newCol < BOARD_SIZE &&
              !newBoard[newRow][newCol].isRevealed &&
              !newBoard[newRow][newCol].isFlagged
            ) {
              newBoard[newRow][newCol].isRevealed = true;
              if (newBoard[newRow][newCol].neighborCount === 0) {
                revealQueue.push({ r: newRow, c: newCol });
              }
            }
          }
        }
      }
    }

    setBoard(newBoard);

    if (checkWin(newBoard)) {
      setWin(true);
      clearInterval(timerInterval);
    }
  };

  const handleFlag = (event, row, col) => {
    event.preventDefault();
    if (gameOver || win || board[row][col].isRevealed) return;

    let newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  };

  const checkWin = (board) => {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (!board[row][col].isMine && !board[row][col].isRevealed) {
          return false;
        }
      }
    }
    return true;
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setGameOver(false);
    setWin(false);
    setFirstClick(true);
    setTimer(0);
    clearInterval(timerInterval);
  };

  useEffect(() => {
    return () => clearInterval(timerInterval);
  }, [timerInterval]);

  return (
    <Rnd
      default={{
        x: 50,
        y: 50,
        width: 290,
        height: 370,
      }}
      disableDragging={false}
      enableResizing={{
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: false,
        right: false,
        top: false,
        topLeft: false,
        topRight: false,
      }}
      bounds="parent"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-[#60639d] p-4 rounded-lg shadow-lg border border-[#46497e] w-full h-full flex flex-col">
        <div className="mb-4 flex justify-between items-center bg-[#afb2e5] p-2 rounded-md">
          <div className="text-sm font-semibold font-outfit text-black">
            Time: {timer}s
          </div>
          <div>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 font-outfit text-white px-3 py-1 rounded text-xs mr-2 transition duration-200"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 font-outfit text-white px-3 py-1 rounded text-xs transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-1 bg-[#afb2e5] p-2 rounded-md flex-grow">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`w-7 h-7 border rounded-sm text-xs font-bold transition duration-200 flex items-center justify-center ${
                  cell.isRevealed
                    ? "bg-blue-50 hover:bg-blue-100"
                    : "bg-[#60639d] hover:bg-[#46497e]"
                } ${cell.isFlagged ? "bg-red-400 hover:bg-red-500" : ""}`}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(event) => handleFlag(event, rowIndex, colIndex)}
                disabled={gameOver || win}
              >
                <span className="select-none">
                  {cell.isRevealed && cell.isMine
                    ? "💣"
                    : cell.isRevealed && cell.neighborCount > 0
                    ? cell.neighborCount
                    : cell.isFlagged
                    ? "🚩"
                    : ""}
                </span>
              </button>
            )),
          )}
        </div>
        {gameOver && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center font-outfit">
            Game Over!
          </div>
        )}
        {win && (
          <div className="mb-4 text-green-600 text-sm font-semibold text-center font-outfit">
            You Win!
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default Minesweeper;