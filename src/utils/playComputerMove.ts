import { checkForWinner } from "./tictactok";

/**
 * Determines the best move for the computer (playing as 'O') in a Tic-Tac-Toe game
 * using the Minimax algorithm.
 * 
 * @param {string[]} board - The current state of the Tic-Tac-Toe board represented as an array of strings.
 *                           Each element is either 'X', 'O', or an empty string.
 * @returns {number} - The index of the best move for the computer.
 */
export const playComputerMove = (board: string[]): number => {
  
  /**
   * Recursive function implementing the Minimax algorithm to evaluate board states.
   * 
   * @param {string[]} board - The current board state.
   * @param {number} depth - The depth of the recursion, used to adjust the score based on how soon a win/loss occurs.
   * @param {boolean} isMax - A flag to determine if it's the maximizing player's turn (computer).
   * @returns {number} - The evaluation score of the board state.
   */
  const minimax = (board: string[], depth: number, isMax: boolean): number => {
    const result = checkForWinner(board);
    
    // Base case: Return a score if there's a winner or a draw
    if (result && result.winner) {
      if (result.winner === "O") return 10 - depth;  // Computer wins, positive score
      if (result.winner === "X") return depth - 10;  // Player wins, negative score
    } else if (!board.includes("")) {
      return 0; // Draw
    }

    let bestEval = isMax ? -Infinity : Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        // Make a move
        board[i] = isMax ? "O" : "X";
        const evalValue = minimax(board, depth + 1, !isMax);
        // Undo the move
        board[i] = "";

        // Update the best evaluation score
        bestEval = isMax ? Math.max(bestEval, evalValue) : Math.min(bestEval, evalValue);
      }
    }

    return bestEval;
  };

  let bestScore = -Infinity;
  let bestMove = -1;

  // Iterate over the board to find the best move for 'O'
  board.forEach((cell, index) => {
    if (cell === "") {
      // Try the move
      board[index] = "O";
      const score = minimax(board, 0, false);  // Simulate the opponent's move (minimizing)
      // Undo the move
      board[index] = "";
      // Update the best move if a better score is found
      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    }
  });

  return bestMove;
};

// import { checkForWinner } from "./tictactok";

// /**
//  * Determines the best move for the computer (playing as 'O') in a Tic-Tac-Toe game
//  * using the Minimax algorithm.
//  * 
//  * @param {string[]} board - The current state of the Tic-Tac-Toe board represented as an array of strings.
//  *                           Each element is either 'X', 'O', or an empty string.
//  * @returns {number} - The index of the best move for the computer.
//  */
// export const playComputerMove = (board: string[]): number => {
  
//   /**
//    * Recursive function implementing the Minimax algorithm to evaluate board states.
//    * 
//    * @param {string[]} board - The current board state.
//    * @param {number} depth - The depth of the recursion, used to adjust the score based on how soon a win/loss occurs.
//    * @param {boolean} isMax - A flag to determine if it's the maximizing player's turn (computer).
//    * @returns {number} - The evaluation score of the board state.
//    */
//   const minimax = (board: string[], depth: number, isMax: boolean): number => {
//     const winner = checkForWinner(board);
    
//     // Base case: Return a score if there's a winner or a draw
//     if (winner !== null) {
//       if (winner === "O") return 10 - depth;  // Computer wins, positive score
//       if (winner === "X") return depth - 10;  // Player wins, negative score
//     } else if (!board.includes("")) {
//       return 0; // Draw
//     }

//     let bestEval = isMax ? -Infinity : Infinity;

//     for (let i = 0; i < board.length; i++) {
//       if (board[i] === "") {
//         // Make a move
//         board[i] = isMax ? "O" : "X";
//         const evalValue = minimax(board, depth + 1, !isMax);
//         // Undo the move
//         board[i] = "";

//         // Update the best evaluation score
//         bestEval = isMax ? Math.max(bestEval, evalValue) : Math.min(bestEval, evalValue);
//       }
//     }

//     return bestEval;
//   };

//   let bestScore = -Infinity;
//   let bestMove = -1;

//   // Iterate over the board to find the best move for 'O'
//   board.forEach((cell, index) => {
//     if (cell === "") {
//       // Try the move
//       board[index] = "O";
//       const score = minimax(board, 0, false);  // Simulate the opponent's move (minimizing)
//       // Undo the move
//       board[index] = "";
//       // Update the best move if a better score is found
//       if (score > bestScore) {
//         bestScore = score;
//         bestMove = index;
//       }
//     }
//   });

//   return bestMove;
// };
