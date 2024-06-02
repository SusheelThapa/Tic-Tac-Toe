import { useEffect, useState } from "react";

import Board from "../components/Board";
import Header from "../components/Header";
import Score from "../components/Score";
import ShepHerdTour from "../components/Shepherd/ShepHerdTour";
import "../assets/css/howToPlay.css";

import { createTour } from "../services/createTour";

import { howToPlay } from "../assets/json/how_to_play.json";
import { startTour } from "../assets/json/startTour.json";
import { playerTour } from "../assets/json/playerTour.json";

import { useTicTacToe } from "../hooks/useTicTacToe";
import GameOver from "../components/GameOver";

const Home = () => {
  const [tour_status, setTourStatus] = useState<boolean>(true);
  const [mute, setMute] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");

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

  const how_to_play = createTour(howToPlay, { useModalOverlay: true });
  const start_tour = createTour(startTour, {
    useModalOverlay: true,
    multiPageTour: true,
    multiPageTourCases: ["FAQ Section", "Developer Section", "Over to you"],
  });

  const player_name = createTour(playerTour, {
    useModalOverlay: true,
    inputButtonFunction: setPlayerName,
  });
  const status = localStorage.getItem("shepherd-tour") != "yes";

  useEffect(() => {
    const storedPlayerName = localStorage.getItem("player_name");
    if (!playerName && !storedPlayerName && !status) {
      player_name.start();
    } else if (storedPlayerName) {
      setPlayerName(storedPlayerName);
    }
  }, [status]);

  useEffect(() => {
    localStorage.setItem("player_name", playerName);
  }, [playerName]);

  return (
    <>
      {tour_status && status && <ShepHerdTour setTourStatus={setTourStatus} />}
      <div className={tour_status ? "z-0" : "flex flex-col"}>
        <Header
          mute={mute}
          handleMuteButton={setMute}
          how_to_play={how_to_play}
          start_tour={start_tour}
        />
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
