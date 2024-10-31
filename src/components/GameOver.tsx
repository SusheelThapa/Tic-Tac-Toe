import { FaRedo, FaTrophy } from "react-icons/fa";
import { SiAlienware } from "react-icons/si";

interface Props {
  winner: string | null;
  resetGame: () => void;
  isTwoPlayerMode: boolean;
}

/**
 * GameOver component that displays the result of the game (winner or tie) and provides an option to restart the game.
 * 
 * @component
 * @param {string | null} winner - The result of the game ('X', 'O', 'Tie', or null).
 * @param {() => void} resetGame - Function to reset the game state and start a new game.
 * @param {boolean} isTwoPlayerMode - Boolean indicating whether the game is in two-player mode.
 * @returns {JSX.Element} - Returns the rendered game over screen.
 */
const GameOver = ({ winner, resetGame, isTwoPlayerMode }: Props): JSX.Element => {
  const playerOneName = localStorage.getItem("player_one_name")
  const playerTwoName = localStorage.getItem("player_two_name")
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-none backdrop-blur-xl">
      <div
        className="text-white text-xl p-4 rounded-lg flex justify-center items-center flex-col gap-5"
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
              {winner === "X"
                ? isTwoPlayerMode
                  ? `${playerOneName} has won`
                  : "Player has won"
                : isTwoPlayerMode
                ? `${playerTwoName} has won`
                : "Computer has won"}
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
  );
};

export default GameOver;
