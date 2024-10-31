import { useNavigate } from "react-router-dom";
import { GameMode } from "../types/enum";

const GameModeSelector = () => {
  const navigate = useNavigate();

  const handleModeSelection = (mode: GameMode) => {
    if(mode == "two-player"){
      navigate(`/player-name-input`);
    }else{
      navigate(`/new-game?mode=${mode}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-12 tracking-wider">
        Select Game Mode
      </h1>
      <div className="flex space-x-8">
        <button
          className="px-6 py-3 bg-black text-white border border-white rounded-lg font-semibold hover:bg-white hover:text-black transition duration-300 transform hover:scale-105"
          onClick={() => handleModeSelection(GameMode.TWO_PLAYER)}
        >
          Two Player Mode
        </button>
        <button
          className="px-6 py-3 bg-black text-white border border-white rounded-lg font-semibold hover:bg-white hover:text-black transition duration-300 transform hover:scale-105"
          onClick={() => handleModeSelection(GameMode.COMPUTER)}
        >
          Computer Mode
        </button>
      </div>
      <p className="mt-10 text-lg opacity-80">
        Play against a friend or challenge the computer!
      </p>
    </div>
  );
};

export default GameModeSelector;
