import { useState, useEffect } from "react";

import { FaTrophy, FaRedo } from "react-icons/fa"; // Import icons
import { SiAlienware } from "react-icons/si";

import useSound from "use-sound";

import Board from "./components/Board";
import Header from "./components/Header";
import Score from "./components/Score";

import noteHigh from "./assets/audio/note-high.mp3";
import noteLow from "./assets/audio/note-low.mp3";
import gameOverSound from "./assets/audio/game-over.mp3";
import gameOverTieSound from "./assets/audio/game-over-tie.mp3";

import { playComputerMove } from "./utils/playComputerMove";
import ShepHerdTour from "./components/Shepherd/ShepHerdTour";
import Shepherd from "shepherd.js";
import { Tour } from "shepherd.js/tour";

import "./assets/css/howToPlay.css";

export const checkForWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const App = () => {
  const [tour_status, setTourStatus] = useState<boolean>(false);

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
    // Automatically let the computer play if it is their turn and the game is not over
    if (!isXTurn && !gameOver) {
      const computerIndex = playComputerMove(board);
      console.log(computerIndex);
      if (computerIndex !== -1) {
        setTimeout(() => handleCellClick(computerIndex, false), 500); // Delay computer move to simulate thinking and allow animations
      }
    }
    console.log("useEffectg called");
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

  const how_to_play: Tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
      classes: "shepherd-theme-light",
      scrollTo: { behavior: "smooth", block: "center" },
      when: {
        show() {},
      },
    },
  });

  const tourSteps = [
    {
      title: "Welcome",
      text: "I'm Agent T., and I will guide you through the features of our tic-tac-toe game.",
      element: null,
      position: "bottom",
      highlight: false,
    },
    {
      title: "Game Header",
      text: "Here in the game's header section, you can find the game title and access various controls.",
      element: "#header",
      position: "bottom",
      highlight: true,
    },
    {
      title: "Vote on Quine",
      text: "If you like our project, you can vote for us here. Just click the upvote icon!",
      element: "#quine-vote",
      position: "bottom",
      highlight: false,
    },
    {
      title: "Github Repository",
      text: "Interested in how this game was built or want to contribute? <br/> Click on the GitHub icon to visit our repository where you can find the source code and project details.",
      element: "#github-repository",
      position: "bottom",
      highlight: false,
    },
    {
      title: "Sound Toggle",
      text: "This button lets you toggle the game's sound. <br/> Click here to mute or unmute the game sounds.",
      element: "#mute-unmute-button",
      position: "bottom",
      highlight: false,
    },
    {
      title: "Game Board",
      text: "This is the main tic-tac-toe board where the game is played. <br/> Click on any empty cell to make a move.",
      element: "#tic-tac-toe-board",
      position: "left",
      highlight: true,
    },
    {
      title: "Game Over Screen",
      text: "This is the game-over screen. <br/> It appears when the game has ended, either in a win, loss, or tie. Here you'll see who won the game and have the option to restart the game.",
      element: "#game-over-screen",
      position: "top", // Position can be adjusted based on your actual layout
      highlight: true,
    },
    {
      title: "Restart Button",
      text: "When you're ready to play again, just click this restart button. <br/> It will reset the board and start a new game.",
      element: "#restart-button",
      position: "bottom",
      highlight: false,
    },
    {
      title: "Game Score",
      text: "Here you can view the current game score. <br/> This area updates with each move to show who's leading.",
      element: "#game-score",
      position: "left",
      highlight: true,
    },
    {
      title: "Player Wins",
      text: "This section displays the total number of games you've won. <br/> Each victory in the game increases this count.",
      element: "#player-won-score",
      position: "bottom",
      highlight: false,
    },
    {
      title: "Game Ties",
      text: "This score counts the number of games that have ended in a tie. <br/> It updates whenever a game ends without a winner.",
      element: "#game-tie-score",
      position: "bottom",
      highlight: false,
    },
    {
      title: "Agent T. Wins",
      text: "This shows how many games the computer has won. <br/> It's updated each time the computer scores a victory.",
      element: "#computer-won-score",
      position: "bottom",
      highlight: false,
    },
    {
      title: "Over to you",
      text: "That's all for now! <br/> I hope you enjoy playing the game. <br/> Signing off, Agent T.",
      element: null, // Or another element that could signify the end of the tour
      position: "top",
      highlight: false,
    },
  ];

  function toggleHighlight(elementId: string, action: string) {
    const element = document.querySelector(elementId);
    if (element) {
      element.classList[action]("highlighted");
    }
  }

  function cleanupLastHighlighted() {
    if (tourSteps.length > 0) {
      const lastStep = tourSteps[tourSteps.length - 1];
      if (lastStep.highlight) {
        toggleHighlight(lastStep.element, "remove");
      }
    }
  }

  const displayProgressBar = () => {
    const currentStepElement = how_to_play.currentStep.el;
    const footer = currentStepElement.querySelector(".shepherd-footer");

    const progressContainer = document.createElement("div");
    const progressBar = document.createElement("span");

    progressContainer.className = "shepherd-progress-bar";
    const progressPercentage =
      ((how_to_play.steps.indexOf(how_to_play.currentStep) + 1) /
        how_to_play.steps.length) *
        100 +
      "%";
    progressBar.style.width = progressPercentage;

    progressContainer.appendChild(progressBar);
    footer.insertBefore(
      progressContainer,
      currentStepElement.querySelector(".shepherd-button")
    );
    console.log(footer);
  };

  tourSteps.forEach((step, index) => {
    how_to_play.addStep({
      title: step.title,
      text: step.text,
      attachTo: {
        element: step.element,
        on: step.position,
      },
      when: step.highlight
        ? {
            show() {
              toggleHighlight(step.element, "add");
              displayProgressBar();
            },
            hide: () => {
              toggleHighlight(step.element, "remove");
              displayProgressBar();
            },
          }
        : {
            show() {
              displayProgressBar();
            },
          },
      buttons:
        index !== 0
          ? [
              {
                action() {
                  return this.back();
                },
                text: "Back",
              },

              {
                action() {
                  return this.next();
                },
                text: "Next",
              },
            ]
          : [
              {
                action() {
                  return this.cancel();
                },
                text: "Skip",
              },
              {
                action() {
                  return this.next();
                },
                text: "Next",
              },
            ],
    });
  });

  how_to_play.on("complete", cleanupLastHighlighted);
  how_to_play.on("cancel", cleanupLastHighlighted);

  return (
    <>
      {tour_status && <ShepHerdTour setTourStatus={setTourStatus} />}
      <div className={tour_status ? "z-0" : "flex flex-col"}>
        <Header
          mute={mute}
          handleMuteButton={setMute}
          how_to_play={how_to_play}
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
                    {winner == "X" ? "You have won" : "Agent T. have won"}
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

export default App;
