import { useState, useEffect } from "react";

// @ts-ignore
import useSound from "use-sound";

import noteHigh from "../assets/audio/note-high.mp3";
import noteLow from "../assets/audio/note-low.mp3";
import gameOverSound from "../assets/audio/game-over.mp3";
import gameOverTieSound from "../assets/audio/game-over-tie.mp3";

import { checkForWinner } from "../utils/tictactok";

export const useTicTacToe = (
  mute: boolean,
  isTwoPlayerMode: boolean,
  playComputerMove: (board: string[]) => number
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

  const [playHighNote] = useSound(noteHigh, { volume: mute ? 0 : 1 });
  const [playLowNote] = useSound(noteLow, { volume: mute ? 0 : 1 });
  const [playGameOver] = useSound(gameOverSound, { volume: mute ? 0 : 1 });
  const [playGameOverTie] = useSound(gameOverTieSound, {
    volume: mute ? 0 : 1,
  });

  useEffect(() => {
    // If it's not a two-player game and it's Player Two's turn (i.e., computer's turn), simulate the computer's move
    if (!isTwoPlayerMode && !isPlayerOneTurn && !gameOver) {
      const computerIndex = playComputerMove(board);
      if (computerIndex !== -1) {
        setTimeout(() => handleCellClick(computerIndex), 500); 
      }
    }
  }, [isPlayerOneTurn, gameOver, board, isTwoPlayerMode]);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsPlayerOneTurn(true);
    setGameOver(false);
    setWinner(null);
  };

  const handleCellClick = (index: number) => {
    if (gameOver || board[index] !== "") return; 
    const newBoard = [...board];
    const newTriggers = Array(9).fill(false);

    newBoard[index] = isPlayerOneTurn ? "X" : "O";
    newTriggers[index] = true; 
    setBoard(newBoard);
    setAnimationTriggers(newTriggers);

   
    const currentNote = isPlayerOneTurn ? playHighNote : playLowNote;
    currentNote();

    const winner = checkForWinner(newBoard);
    if (winner) {
      setWinner(winner);
      setGameOver(true); 

      if (winner === "X") {
        setPlayerOneWins((prevWins) => prevWins + 1);
      } else {
        setPlayerTwoWins((prevWins) => prevWins + 1);
      }

      playGameOver();
    } else if (!newBoard.includes("")) {
      setWinner("Tie");
      playGameOverTie();
      setGameOver(true); 

      setTies((prevTies) => prevTies + 1);
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
