import React, { useState, useEffect, useRef } from 'react';
import "./index2048.css"

const Index = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [board, setBoard] = useState([]);
  const containerRef = useRef(null);

  const prefix = 'game';
  const len = 4;
  const size = 100;
  const margin = 20;
  const winNum = 2048;

  const initBoard = () => {
    const newBoard = [];
    for (let x = 0; x < len; x++) {
      newBoard[x] = Array(len).fill(0);
    }
    setBoard(newBoard);
  };



  const generateNumber = () => {
    const emptyCells = [];
    for (let x = 0; x < len; x++) {
      for (let y = 0; y < len; y++) {
        if (board?.[x]?.[y] === 0) {
          emptyCells.push({ x, y });
        }
      }
    }

    if (emptyCells.length === 0) {
      return false;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { x, y } = emptyCells[randomIndex];
    const number = Math.random() < 0.5 ? 2 : 4;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[x][y] = number;
      return newBoard;
    });
  };

  const moveLeft = () => {
    let moved = false;
    for (let x = 0; x < len; x++) {
      for (let y = 0; y < len - 1; y++) {
        let nextX = y + 1;
        while (nextX < len && board[x][nextX] === 0) {
          nextX++;
        }

        if (nextX < len && board[x][y] === 0) {
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[x][y] = newBoard[x][nextX];
            newBoard[x][nextX] = 0;
            return newBoard;
          });
          moved = true;
          y--; // Check the same cell again after moving
        } else if (nextX < len && board[x][y] === board[x][nextX]) {
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[x][y] *= 2;
            newBoard[x][nextX] = 0;
            setScore((prevScore) => prevScore + newBoard[x][y]);
            return newBoard;
          });
          moved = true;
        }
      }
    }
    return moved;
  };

  const moveRight = () => {
    let moved = false;
    for (let x = 0; x < len; x++) {
      for (let y = len - 1; y > 0; y--) {
        let prevX = y - 1;
        while (prevX >= 0 && board[x][prevX] === 0) {
          prevX--;
        }

        if (prevX >= 0 && board[x][y] === 0) {
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[x][y] = newBoard[x][prevX];
            newBoard[x][prevX] = 0;
            return newBoard;
          });
          moved = true;
          y++; // Check the same cell again after moving
        } else if (prevX >= 0 && board[x][y] === board[x][prevX]) {
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[x][y] += newBoard[x][prevX];
            newBoard[x][prevX] = 0;
            setScore((prevScore) => prevScore + newBoard[x][y]);
            moved = true;
          })
        }
      }
      return moved
    };
    return moved;
  }

  const moveUp = () => {
    let moved = false;
    for (let y = 0; y < len; y++) {
      for (let x = 0; x < len - 1; x++) {
        let nextX = x + 1;
        while (nextX < len && board[nextX][y] === 0) {
          nextX++;
        }

        if (nextX < len && board[x][y] === 0) {
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[x][y] = newBoard[nextX][y];
            newBoard[nextX][y] = 0;
            return newBoard;
          });
          moved = true;
          x--; // Check the same cell again after moving
        } else if (nextX < len && board[x][y] === board[nextX][y]) {
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[x][y] *= 2;
            newBoard[nextX][y] = 0;
            setScore((prevScore) => prevScore + newBoard[x][y]);
            return newBoard;
          });
          moved = true;
        }
      }
    }
    return moved;
  };

  const moveDown = () => {
    let moved = false;
    for (let y = 0; y < len; y++) {
      for (let x = len - 1; x > 0; x--) {
        let prevX = x - 1;
        while (prevX >= 0 && board[prevX][y] === 0) {
          prevX--;
        }

        if (prevX >= 0 && board[x][y] === 0) {
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[x][y] = newBoard[prevX][y];
            newBoard[prevX][y] = 0;
            return newBoard;
          });
          moved = true;
          x++; // Check the same cell again after moving
        } else if (prevX >= 0 && board[x][y] === board[prevX][y]) {
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[x][y] += newBoard[prevX][y];
            newBoard[prevX][y] = 0;
            setScore((prevScore) => prevScore + newBoard[x][y]);
            return newBoard;
          });
          moved = true;
        }
      }
    }
    return moved;
  };

  const handleKeyDown = (event) => {
    if (isGameOver) {
      return;
    }

    switch (event.which) {
      case 37: // Left arrow
        if (moveLeft()) {
          generateNumber();
        }
        break;
      case 38: // Up arrow
        if (moveUp()) {
          generateNumber();
        }
        break;
      case 39: // Right arrow
        if (moveRight()) {
          generateNumber();
        }
        break;
      case 40: // Down arrow
        if (moveDown()) {
          generateNumber();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    initBoard();
    generateNumber();
    generateNumber();

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (board.some((row) => row.some((cell) => cell === winNum))) {
      setIsGameOver(true);
    }
  }, [board]);

  const restartGame = () => {
    setScore(0);
    setIsGameOver(false);
    initBoard();
    generateNumber();
    generateNumber();
  };



  const getPos = (n) => margin + n * (size + margin);

  const renderCells = () => {
    const cells = [];
    for (let x = 0; x < len; x++) {
      for (let y = 0; y < len; y++) {
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`${prefix}-cell`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${getPos(x)}px`,
              left: `${getPos(y)}px`,
            }}
          >
            {board?.[x]?.[y] > 0 && (
              <div
                className={`${prefix}-num ${prefix}-num-${board[x][y]}`}
                style={{
                  lineHeight: `${size}px`,
                }}
              >
                {board[x][y]}
              </div>
            )}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div id="game" className={"game"}>
      <div className={"game-score"}>分数毫无意义：<span id="game_score">{score}</span></div>
      <div id="game_container" className={"game-container"} ref={containerRef}>
        {renderCells()}
        <div id="game_over" className={`game-over ${isGameOver ? '' : 'game-hide'}`}>
          <div className={"game-over-info"}>
            <div id="game_over_info">
              {isGameOver ? '您获胜了！' : '本次得分：'}{score}
            </div>
            <span id="game_restart" onClick={restartGame}>重新开始</span>
          </div>
        </div>
      </div>
    </div>
  );

}
export default Index