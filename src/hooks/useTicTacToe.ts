import { useState, useEffect } from "react";

// @ts-ignore
import useSound from "use-sound";

import noteHigh from "../assets/audio/note-high.mp3";
import noteLow from "../assets/audio/note-low.mp3";
import gameOverSound from "../assets/audio/game-over.mp3";
import gameOverTieSound from "../assets/audio/game-over-tie.mp3";

import { checkForWinner } from "../utils/tictactok";

/**
 * Custom hook for managing Tic-Tac-Toe game state.
 * 
 * @param {boolean} mute - Whether to mute game sounds.
 * @param {boolean} isTwoPlayerMode - If true, enables two-player mode; otherwise, one-player mode with a computer.
 * @param {(board: string[]) => number} computerMove - Function to determine computer's move based on current board state.
 * @returns {object} - Returns the board state, game status, player stats, and functions to interact with the game.
 */
export const useTicTacToe = (
  mute: boolean,
  isTwoPlayerMode: boolean,
  computerMove: (board: string[]) => number
) => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [animationTriggers, setAnimationTriggers] = useState<boolean[]>(
    Array(9).fill(false)
  );

  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);
  const [ties, setTies] = useState(0);

  const soundSettings = { volume: mute ? 0 : 1 };
  const [playHighNote] = useSound(noteHigh, soundSettings);
  const [playLowNote] = useSound(noteLow, soundSettings);
  const [playGameOver] = useSound(gameOverSound, soundSettings);
  const [playGameOverTie] = useSound(gameOverTieSound, soundSettings);

  useEffect(() => {
    if (!isTwoPlayerMode && !isPlayerOneTurn && !gameOver) {
      const computerIndex = computerMove(board);
      if (computerIndex !== -1) {
        setTimeout(() => handleCellClick(computerIndex), 500);
      }
    }
  }, [isPlayerOneTurn, gameOver, board, isTwoPlayerMode]);

  /**
   * Resets the game to the initial state.
   */
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsPlayerOneTurn(true);
    setGameOver(false);
    setWinner(null);
  };

  /**
   * Handles a player's move by updating the board and checking for a winner.
   * 
   * @param {number} index - The index of the clicked cell on the board.
   */
  const handleCellClick = (index: number) => {
    if (gameOver || board[index] !== "") return;

    const newBoard = [...board];
    const newTriggers = Array(9).fill(false);

    newBoard[index] = isPlayerOneTurn ? "X" : "O";
    newTriggers[index] = true;
    setBoard(newBoard);
    setAnimationTriggers(newTriggers);

    // Play the sound based on the current player's turn
    (isPlayerOneTurn ? playHighNote : playLowNote)();

    const winner = checkForWinner(newBoard);
    if (winner) {
      setWinner(winner);
      setGameOver(true);
      setPlayerOneWins((prev) => prev + (winner === "X" ? 1 : 0));
      setPlayerTwoWins((prev) => prev + (winner === "O" ? 1 : 0));
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
    animationTriggers,
    playerOneWins,
    playerTwoWins,
    ties,
    resetGame,
    handleCellClick,
  };
};
