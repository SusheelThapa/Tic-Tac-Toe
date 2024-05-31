import { useState } from "react";

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

const App = () => {
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

  const checkForWinner = (squares: string[]) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setGameOver(false);
    setWinner(null);
  };

  const handleCellClick = (index: number) => {
    if (gameOver || board[index] !== "") return; // Prevent overwriting a cell

    const newBoard = [...board];
    const newTriggers = Array(9).fill(false); // Reset all triggers

    newBoard[index] = isXTurn ? "X" : "O";
    newTriggers[index] = true; // Trigger animation only for the clicked cell

    setBoard(newBoard);
    setAnimationTriggers(newTriggers);

    if (isXTurn) {
      playHighNote();
    } else {
      playLowNote();
    }

    const winner = checkForWinner(newBoard);
    if (winner) {
      setWinner(winner);
      playGameOver();
      setGameOver(true); // End the game
      winner == "X"
        ? setPlayerWins((prevWins) => prevWins + 1)
        : setComputerWins((prevWins) => prevWins + 1);
    } else if (!newBoard.includes("")) {
      setWinner("Tie");
      playGameOverTie();
      setGameOver(true); // End the game if all cells are filled and no winner

      setTies((prevTies) => prevTies + 1);
    } else {
      setIsXTurn(!isXTurn); // Toggle turn if the game continues
    }

    setIsXTurn(!isXTurn); // Toggle turn
  };

  return (
    <>
      <Header mute={mute} handleMuteButton={setMute} />
      <Board
        board={board}
        handleCellClick={handleCellClick}
        animationTriggers={animationTriggers}
      />
      <Score playerWins={playerWins} computerWins={computerWins} ties={ties} />
      {gameOver && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div
            className="text-white text-xl p-4 rounded-lg flex justify-center items-center flex-col gap-5"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            {winner === "Tie" ? (
              <>
                <SiAlienware className=" text-[10rem]" />
                <p className="text-3xl">It's a Tie!</p>
              </>
            ) : (
              <>
                <FaTrophy className=" text-[10rem]" />
                <p className="text-3xl">{`${winner} Wins!`}</p>
              </>
            )}
          </div>
          <button
            onClick={resetGame}
            className="mt-4 p-2 bg-white text-black rounded-md flex items-center px-5 py-2 text-xl font-semibold"
          >
            <FaRedo className="mr-2" /> {/* Redo icon for restart */}
            Restart
          </button>
        </div>
      )}
    </>
  );
};

export default App;
