import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Board from "../components/Board";
import Score from "../components/Score";
import { useTicTacToe } from "../hooks/useTicTacToe";
import GameOver from "../components/GameOver";
import { playComputerMove } from "../utils/playComputerMove";

/**
 * Game component that renders the Tic-Tac-Toe game UI and manages game state.
 * It supports both two-player mode and single-player mode against the computer.
 *
 * @component
 */
const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  
  const isTwoPlayerMode = searchParams.get("mode") === "two-player";

 
  const [playerOneName] = useState<string>(
    isTwoPlayerMode ? "Player One" : "Player"
  );
  const [playerTwoName] = useState<string>(
    isTwoPlayerMode ? "Player Two" : "Computer"
  );


  const {
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
  } = useTicTacToe(false, isTwoPlayerMode, playComputerMove);


  const [showRestartButton, setShowRestartButton] = useState(false);

 
  useEffect(() => {
    localStorage.setItem("player_one_name", playerOneName);
    localStorage.setItem("player_two_name", playerTwoName);
  }, [playerOneName, playerTwoName]);

  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && gameOver) {
        setShowRestartButton(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  
  const handleRestartClick = () => {
    resetGame();
    setShowRestartButton(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center h-screen w-screen">
        <Board
          board={board}
          handleCellClick={handleCellClick}
          animationTriggers={animationTriggers}
          winningLine={winningLine} 
        />
        <Score
          isPlayerOneTurn={isPlayerOneTurn}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          playerOneWins={playerOneWins}
          playerTwoWins={playerTwoWins}
          ties={ties}
        />
        {gameOver && (
          <GameOver
            winner={winner}
            resetGame={resetGame}
            isTwoPlayerMode={isTwoPlayerMode}
            winningLine={null}
          />
        )}
        {showRestartButton && (
          <div className="flex flex-col items-center mt-4">
            <div className="text-6xl text-yellow-500 mb-2">🏆</div>
            <button
              onClick={handleRestartClick}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Restart Game
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
