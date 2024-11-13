import { useState, useEffect } from "react";
import useSound from "use-sound";
import { checkForWinner } from "../utils/tictactok";

export const useTicTacToe = (
  mute: boolean,
  isTwoPlayerMode: boolean,
  computerMove: (board: string[]) => number
) => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [animationTriggers, setAnimationTriggers] = useState<boolean[]>(Array(9).fill(false));

  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);
  const [ties, setTies] = useState(0);

  const soundSettings = { volume: mute ? 0 : 1 };
  const [playHighNote] = useSound("/audio/note-high.mp3", soundSettings);
  const [playLowNote] = useSound("/audio/note-low.mp3", soundSettings);
  const [playGameOver] = useSound("/audio/game-over.mp3", soundSettings);
  const [playGameOverTie] = useSound("/audio/game-over-tie.mp3", soundSettings);

  // Automatically play the computer's move in single-player mode
  useEffect(() => {
    if (!isTwoPlayerMode && !isPlayerOneTurn && !gameOver) {
      const computerIndex = computerMove(board);
      if (computerIndex !== -1) {
        setTimeout(() => handleCellClick(computerIndex), 1000);
      }
    }
  }, [isPlayerOneTurn, gameOver, board, isTwoPlayerMode]);

  // Reset the game state
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsPlayerOneTurn(true);
    setGameOver(false);
    setWinner(null);
    setWinningLine(null); // Reset winning line
    setAnimationTriggers(Array(9).fill(false)); // Reset animations
  };

  // Handle a cell click
  const handleCellClick = (index: number) => {
    if (gameOver || board[index] !== "") return;

    const newBoard = [...board];
    const newTriggers = Array(9).fill(false);

    newBoard[index] = isPlayerOneTurn ? "X" : "O";
    newTriggers[index] = true;
    setBoard(newBoard);
    setAnimationTriggers(newTriggers);

    // Play sound based on player turn
    (isPlayerOneTurn ? playHighNote : playLowNote)();

    // Check for a winner or tie
    const result = checkForWinner(newBoard);
    if (result && result.winner) {
      setWinner(result.winner);
      setWinningLine(result.winningLine); // Save winning line for highlight
      setGameOver(true);
      if (result.winner === "X") {
        setPlayerOneWins((prev) => prev + 1);
      } else {
        setPlayerTwoWins((prev) => prev + 1);
      }
      playGameOver();
    } else if (!newBoard.includes("")) {
      setWinner("Tie");
      setTies((prev) => prev + 1);
      setGameOver(true);
      playGameOverTie();
    } else {
      setIsPlayerOneTurn(!isPlayerOneTurn);
    }
  };

  return {
    board,
    gameOver,
    winner,
    winningLine,
    animationTriggers,
    playerOneWins,
    playerTwoWins,
    ties,
    resetGame,
    handleCellClick,
    isPlayerOneTurn,
  };
};

// import { useState, useEffect } from "react";
// import useSound from "use-sound";
// import { checkForWinner } from "../utils/tictactok";

// export const useTicTacToe = (
//   mute: boolean,
//   isTwoPlayerMode: boolean,
//   computerMove: (board: string[]) => number
// ) => {
//   const [board, setBoard] = useState(Array(9).fill(""));
//   const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
//   const [gameOver, setGameOver] = useState(false);
//   const [winner, setWinner] = useState<string | null>(null);
//   const [winningLine, setWinningLine] = useState<number[] | null>(null); // Thêm winningLine
//   const [animationTriggers, setAnimationTriggers] = useState<boolean[]>(Array(9).fill(false));

//   const [playerOneWins, setPlayerOneWins] = useState(0);
//   const [playerTwoWins, setPlayerTwoWins] = useState(0);
//   const [ties, setTies] = useState(0);

//   const soundSettings = { volume: mute ? 0 : 1 };
//   const [playHighNote] = useSound("/audio/note-high.mp3", soundSettings);
//   const [playLowNote] = useSound("/audio/note-low.mp3", soundSettings);
//   const [playGameOver] = useSound("/audio/game-over.mp3", soundSettings);
//   const [playGameOverTie] = useSound("/audio/game-over-tie.mp3", soundSettings);

//   useEffect(() => {
//     if (!isTwoPlayerMode && !isPlayerOneTurn && !gameOver) {
//       const computerIndex = computerMove(board);
//       if (computerIndex !== -1) {
//         setTimeout(() => handleCellClick(computerIndex), 1000);
//       }
//     }
//   }, [isPlayerOneTurn, gameOver, board, isTwoPlayerMode]);

//   const resetGame = () => {
//     setBoard(Array(9).fill(""));
//     setIsPlayerOneTurn(true);
//     setGameOver(false);
//     setWinner(null);
//     setWinningLine(null); // Reset winning line
//   };

//   const handleCellClick = (index: number) => {
//     if (gameOver || board[index] !== "") return;

//     const newBoard = [...board];
//     const newTriggers = Array(9).fill(false);

//     newBoard[index] = isPlayerOneTurn ? "X" : "O";
//     newTriggers[index] = true;
//     setBoard(newBoard);
//     setAnimationTriggers(newTriggers);

//     (isPlayerOneTurn ? playHighNote : playLowNote)();

//     const result = checkForWinner(newBoard);
//     if (result && result.winner) {
//       setWinner(result.winner);
//       setWinningLine(result.winningLine); // Lưu đường thắng
//       setGameOver(true);
//       setPlayerOneWins((prev) => prev + (result.winner === "X" ? 1 : 0));
//       setPlayerTwoWins((prev) => prev + (result.winner === "O" ? 1 : 0));
//       playGameOver();
//     } else if (!newBoard.includes("")) {
//       setWinner("Tie");
//       setTies((prev) => prev + 1);
//       setGameOver(true);
//       playGameOverTie();
//     } else {
//       setIsPlayerOneTurn(!isPlayerOneTurn);
//     }
//   };

//   return {
//     board,
//     gameOver,
//     winner,
//     winningLine,
//     animationTriggers,
//     playerOneWins,
//     playerTwoWins,
//     ties,
//     resetGame,
//     handleCellClick,
//     isPlayerOneTurn,
//   };
// };

