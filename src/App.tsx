import { useState } from "react";
import useSound from "use-sound";

import Board from "./components/Board";
import Header from "./components/Header";
import Score from "./components/Score";

import noteHigh from "./assets/audio/note-high.mp3";
import noteLow from "./assets/audio/note-low.mp3";

const App = () => {
  const [mute, setMute] = useState<boolean>(false);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [animationTriggers, setAnimationTriggers] = useState<boolean[]>(
    Array(9).fill(false)
  );

  const [playHighNote] = useSound(noteHigh, { volume: mute ? 0 : 1 });
  const [playLowNote] = useSound(noteLow, { volume: mute ? 0 : 1 });

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
    if (board[index] !== "") return; // Prevent overwriting a cell

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
      setGameOver(true); // End the game
    } else if (!newBoard.includes("")) {
      setWinner("Tie");
      setGameOver(true); // End the game if all cells are filled and no winner
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
      <Score />
      {gameOver && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
          <div>
            {winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`}
            <button
              onClick={resetGame}
              className="ml-4 p-2 bg-white text-black rounded"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
