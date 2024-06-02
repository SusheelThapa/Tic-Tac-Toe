import { useState, useEffect } from "react";
import { FaTrophy, FaRedo } from "react-icons/fa"; // Import icons
import { SiAlienware } from "react-icons/si";
// @ts-ignore
import useSound from "use-sound";
import Board from "../components/Board";
import Header from "../components/Header";
import Score from "../components/Score";
import noteHigh from "../assets/audio/note-high.mp3";
import noteLow from "../assets/audio/note-low.mp3";
import gameOverSound from "../assets/audio/game-over.mp3";
import gameOverTieSound from "../assets/audio/game-over-tie.mp3";
import { playComputerMove } from "../utils/playComputerMove";
import ShepHerdTour from "../components/Shepherd/ShepHerdTour";
import "../assets/css/howToPlay.css";

import { checkForWinner } from "../utils/tictactok";
import { TourStep } from "../types/types";
import { createTour } from "../services/createTour";

import { howToPlay } from "../assets/json/how_to_play.json";
import { startTour } from "../assets/json/startTour.json";

const Home = () => {
  const [tour_status, setTourStatus] = useState<boolean>(true);
  const [mute, setMute] = useState<boolean>(false);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [animationTriggers, setAnimationTriggers] = useState<boolean[]>(
    Array(9).fill(false)
  );
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [ties, setTies] = useState(0);

  const [playHighNote] = useSound(noteHigh, { volume: mute ? 0 : 1 });
  const [playLowNote] = useSound(noteLow, { volume: mute ? 0 : 1 });
  const [playGameOver] = useSound(gameOverSound, { volume: mute ? 0 : 1 });
  const [playGameOverTie] = useSound(gameOverTieSound, {
    volume: mute ? 0 : 1,
  });

  useEffect(() => {
    if (!isXTurn && !gameOver) {
      const computerIndex = playComputerMove(board);
      if (computerIndex !== -1) {
        setTimeout(() => handleCellClick(computerIndex, false), 500); // Delay computer move to simulate thinking and allow animations
      }
    }
  }, [isXTurn, gameOver, board]); // Dependency array to trigger effect on turn change or game status change

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setGameOver(false);
    setWinner(null);
  };

  const handleCellClick = (index: number, player = true) => {
    if (gameOver || board[index] !== "") return; // Prevent overwriting a cell

    const newBoard = [...board];
    const newTriggers = Array(9).fill(false); // Reset all triggers

    newBoard[index] = isXTurn ? "X" : "O";
    newTriggers[index] = true; // Trigger animation only for the clicked cell

    setBoard(newBoard);
    setAnimationTriggers(newTriggers);

    const currentNote = player ? playHighNote : playLowNote;
    currentNote(); // Play the respective sound note

    const winner = checkForWinner(newBoard);
    if (winner) {
      setWinner(winner);
      setGameOver(true); // End the game

      winner === "X"
        ? setPlayerWins((prevWins) => prevWins + 1)
        : setComputerWins((prevWins) => prevWins + 1);

      playGameOver();
    } else if (!newBoard.includes("")) {
      setWinner("Tie");
      playGameOverTie();
      setGameOver(true); // End the game if all cells are filled and no winner

      setTies((prevTies) => prevTies + 1);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const howToPlaySteps: TourStep[] = howToPlay;
  const startTourSteps: TourStep[] = startTour;

  // Define the multi-page tour cases
  const multiPageTourCases = [
    "FAQ Section",
    "Developer Section",
    "Over to you",
  ];

  const how_to_play = createTour(howToPlaySteps, { useModalOverlay: true });
  const start_tour = createTour(startTourSteps, {
    useModalOverlay: true,
    multiPageTour: true,
    multiPageTourCases: multiPageTourCases,
  });

  const status = localStorage.getItem("shepherd-tour") != "yes";
  
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
              <FaRedo className="mr-2" /> {/* Redo icon for restart */}
              Restart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
