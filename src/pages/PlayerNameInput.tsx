import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayerNameInput = () => {
  const navigate = useNavigate();
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerOne && playerTwo) {
      localStorage.setItem("player_one_name", playerOne);
      localStorage.setItem("player_two_name", playerTwo);
      navigate("/new-game?mode=two-player");
    } else {
      alert("Please enter names for both players.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-12">Enter Player Names</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Player One Name"
          value={playerOne}
          onChange={(e) => setPlayerOne(e.target.value)}
          className="p-2 border border-white rounded"
          required
        />
        <input
          type="text"
          placeholder="Player Two Name"
          value={playerTwo}
          onChange={(e) => setPlayerTwo(e.target.value)}
          className="p-2 border border-white rounded"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-white text-black border border-white rounded-lg font-semibold hover:bg-gray-200 transition duration-300 transform hover:scale-105"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerNameInput;
