import { useEffect, useState } from "react";

import Board from "../components/Board";
import Score from "../components/Score";

import { useTicTacToe } from "../hooks/useTicTacToe";
import GameOver from "../components/GameOver";

const Game = () => {
  const [playerName] = useState<string>("Player");

  const {
    board,
    gameOver,
    winner,
    animationTriggers,
    playerWins,
    computerWins,
    ties,
    resetGame,
    handleCellClick,
  } = useTicTacToe(false);

  useEffect(() => {
    localStorage.setItem("player_name", playerName);
  }, [playerName]);

  return (
    <>
      <div className="flex flex-col justify-center h-screen w-screen">
        <Board
          board={board}
          handleCellClick={handleCellClick}
          animationTriggers={animationTriggers}
        />
        <Score
          playerName={playerName}
          playerWins={playerWins}
          computerWins={computerWins}
          ties={ties}
        />
        {gameOver && <GameOver winner={winner} resetGame={resetGame} />}
      </div>
    </>
  );
};

export default Game;
