import { FaRedo, FaTrophy } from "react-icons/fa";
import { SiAlienware } from "react-icons/si";

interface Props {
  winner: string | null;
  resetGame: () => void;
}
const GameOver = ({ winner, resetGame }: Props) => {
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
  );
};

export default GameOver;
