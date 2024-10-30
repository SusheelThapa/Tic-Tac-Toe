import { useNavigate } from "react-router-dom";
import { GameMode } from "../types/enum";
import { FaUser, FaRobot } from 'react-icons/fa'; 

const GameModeSelector = () => {
  const navigate = useNavigate();

  const handleModeSelection = (mode: GameMode) => {
    navigate(`/new-game?mode=${mode}`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-r bg-black-600 text-white">
      <h1 className="text-5xl font-extrabold mb-12 tracking-wider drop-shadow-lg">Select Game Mode</h1>
      <div className="flex space-x-8">
        {/* Card for Two Player Mode */}
        <div
          className="w-72 bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:bg-purple-700 hover:shadow-2xl cursor-pointer"
          onClick={() => handleModeSelection(GameMode.TWO_PLAYER)}
        >
          <div className="flex items-center justify-center h-40 bg-gray-600">
            <FaUser className="text-6xl text-white" />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Two Player Mode</h2>
            <p className="text-md opacity-90">Play against a friend!</p>
          </div>
        </div>

        {/* Card for Computer Mode */}
        <div
          className="w-72 bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-2xl cursor-pointer"
          onClick={() => handleModeSelection(GameMode.COMPUTER)}
        >
          <div className="flex items-center justify-center h-40 bg-gray-600">
            <FaRobot className="text-6xl text-white" />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Computer Mode</h2>
            <p className="text-md opacity-90">Challenge the computer!</p>
          </div>
        </div>
      </div>
      <p className="mt-12 text-lg opacity-90">Choose your preferred game mode to start playing!</p>
    </div>
  );
};

export default GameModeSelector;