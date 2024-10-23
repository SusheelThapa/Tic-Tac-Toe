import { useNavigate } from "react-router-dom";
import { GameMode } from "../types/enum";

const GameModeSelector = () => {
  const navigate = useNavigate();

  const handleModeSelection = (mode: GameMode) => {
    navigate(`/new-game?mode=${mode}`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-black text-white">
      <h1 className="text-3xl mb-8">Select Game Mode</h1>
      <div className="flex space-x-4">
        <button
          className="p-2 bg-white text-black border rounded"
          onClick={() => handleModeSelection(GameMode.TWO_PLAYER)}
        >
          Two Player Mode
        </button>
        <button
          className="p-2 bg-white text-black border rounded"
          onClick={() => handleModeSelection(GameMode.COMPUTER)}
        >
          Computer Mode
        </button>
      </div>
    </div>
  );
};

export default GameModeSelector;
