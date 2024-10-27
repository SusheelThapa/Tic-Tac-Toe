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

  // Determines if it's two-player mode based on the query parameter "mode"
  const isTwoPlayerMode = searchParams.get("mode") === "two-player";

  // Set player names based on the game mode
  const [playerOneName] = useState<string>(
    isTwoPlayerMode ? "Player One" : "Player"
  );
  const [playerTwoName] = useState<string>(
    isTwoPlayerMode ? "Player Two" : "Computer"
  );

  // Destructure the values returned by useTicTacToe hook
  const {
    board,
    gameOver,
    winner,
    animationTriggers,
    playerOneWins,
    playerTwoWins,
    ties,
    resetGame,
    handleCellClick,
    isPlayerOneTurn,
  } = useTicTacToe(false, isTwoPlayerMode, playComputerMove); // Pass game mode to the hook

  // Save player names to localStorage on mount
  useEffect(() => {
    localStorage.setItem("player_one_name", playerOneName);
    localStorage.setItem("player_two_name", playerTwoName);
  }, [playerOneName, playerTwoName]);

  return (
    <>
      <div className="flex flex-col justify-center h-screen w-screen">
        <Board
          board={board}
          handleCellClick={handleCellClick}
          animationTriggers={animationTriggers}
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
          />
        )}
      </div>
    </>
  );
};

export default Game;
