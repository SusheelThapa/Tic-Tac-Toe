import { checkForWinner } from "../pages/Home";
// playComputerMove.ts

export const playComputerMove = (board: string[]): number => {
  const minimax = (board: string[], depth: number, isMax: boolean): number => {
    const winner = checkForWinner(board);
    if (winner !== null) {
      if (winner === "O") return 10 - depth;
      if (winner === "X") return depth - 10;
    } else if (!board.includes("")) {
      return 0; // Draw
    }

    let bestEval = isMax ? -Infinity : Infinity;
    const updateEval = (evalValue: number): void => {
      if (isMax) {
        bestEval = Math.max(bestEval, evalValue);
      } else {
        bestEval = Math.min(bestEval, evalValue);
      }
    };

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = isMax ? "O" : "X";
        const evalValue = minimax(board, depth + 1, !isMax);
        board[i] = ""; // Undo the move
        updateEval(evalValue);
      }
    }

    return bestEval;
  };

  let bestScore = -Infinity;
  let bestMove = -1;
  board.forEach((cell, index) => {
    if (cell === "") {
      board[index] = "O";
      const score = minimax(board, 0, false);
      board[index] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    }
  });

  return bestMove;
};
