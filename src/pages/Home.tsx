// Home.tsx

import { useEffect, useState } from "react";
import { FaTrophy, FaRedo } from "react-icons/fa"; // Import icons
import { SiAlienware } from "react-icons/si";
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
    if (!playerName && !storedPlayerName && !status ) {
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
        {gameOver && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
            <div
              className="text-white text-xl p-4 rounded-lg flex justify-center items-center flex-col gap-5"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
              id="game-over-screen"
            >
              {winner === "Tie" ? (
                <>
                  <SiAlienware className=" text-[10rem]" />
                  <p className="text-3xl">It's a Tie!</p>
                </>
              ) : (
                <>
                  <FaTrophy className=" text-[10rem]" />
                  <p className="text-3xl">
                    {winner === "X" ? "You have won" : "Agent T. has won"}
                  </p>
                </>
              )}
            </div>
            <button
              id="restart-button"
              onClick={resetGame}
              className="mt-4 p-2 bg-white text-black rounded-md flex items-center px-5 py-2 text-xl font-semibold"
            >
              <FaRedo className="mr-2" />
              Restart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
