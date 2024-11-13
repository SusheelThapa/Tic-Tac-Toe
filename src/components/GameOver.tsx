import React, { useEffect, useState } from "react";
import { FaRedo, FaTrophy } from "react-icons/fa";
import { SiAlienware } from "react-icons/si";

interface Props {
  winner: string | null;
  resetGame: () => void;
  isTwoPlayerMode: boolean;
  winningLine: number[] | null;
}

const GameOver = ({
  winner,
  resetGame,
  isTwoPlayerMode,
  winningLine,
}: Props): JSX.Element => {
  const [showTrophy, setShowTrophy] = useState(false);

  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setShowTrophy(true);
      }
    };

    window.addEventListener("keydown", handleEnterPress);

    return () => {
      window.removeEventListener("keydown", handleEnterPress);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-transparent">
      <div
        className="text-white text-xl p-4 rounded-lg flex justify-center items-center flex-col gap-5"
        id="game-over-screen"
      >
        {showTrophy && (
          <>
            {winner === "Tie" ? (
              <>
                <SiAlienware className="text-[10rem]" />
                <p className="text-3xl">It's a Tie!</p>
              </>
            ) : (
              <>
                <FaTrophy className="text-[10rem]" />
                <p className="text-3xl">
                  {winner === "X"
                    ? isTwoPlayerMode
                      ? "Player One has won"
                      : "Player has won"
                    : isTwoPlayerMode
                    ? "Player Two has won"
                    : "Computer has won"}
                </p>
              </>
            )}
          </>
        )}
      </div>

      {/* Display winning line if available */}
      {winningLine && (
        <div className="absolute flex justify-center items-center gap-2 text-xl text-white mt-4">
          <p>Winning Line:</p>
          <div className="flex gap-2">
            {winningLine.map((index) => (
              <div
                key={index}
                className="w-8 h-8 flex justify-center items-center rounded-full bg-green-500"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {showTrophy && (
        <button
          id="restart-button"
          onClick={resetGame}
          className="mt-4 p-2 bg-white text-black rounded-md flex items-center px-5 py-2 text-xl font-semibold"
        >
          <FaRedo className="mr-2" />
          Restart
        </button>
      )}
    </div>
  );
};

export default GameOver;
