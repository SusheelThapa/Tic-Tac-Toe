import { useEffect, useState } from "react";

import Board from "../components/Board";
import Header from "../components/Header";
import Score from "../components/Score";

import { useTicTacToe } from "../hooks/useTicTacToe";
import GameOver from "../components/GameOver";

const Home = () => {
  const [mute, setMute] = useState<boolean>(false);
  const [playerName] = useState<string>("John Doe");

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
  } = useTicTacToe(mute);

  useEffect(() => {
    localStorage.setItem("player_name", playerName);
  }, [playerName]);

  return (
    <>
      <div className="flex flex-col">
        <Header mute={mute} handleMuteButton={setMute} />
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

export default Home;
