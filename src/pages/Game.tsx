import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Board from "../components/Board";
import Score from "../components/Score";
import { useTicTacToe } from "../hooks/useTicTacToe";
import GameOver from "../components/GameOver";
import { playComputerMove } from "../utils/playComputerMove";

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
    animationTriggers,
    playerOneWins,
    playerTwoWins,
    ties,
    resetGame,
    handleCellClick,
  } = useTicTacToe(false, isTwoPlayerMode,playComputerMove); // Pass game mode to the hook

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
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          playerOneWins={playerOneWins}
          playerTwoWins={playerTwoWins}
          ties={ties}
        />
        {gameOver && <GameOver winner={winner} resetGame={resetGame} />}
      </div>
    </>
  );
};

export default Game;
