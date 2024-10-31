import { useState } from 'react';
import { GiTicTacToe } from 'react-icons/gi';
import { AiFillGithub } from 'react-icons/ai';

const Gameplay = () => {
  // State to track the active section
  const [activeSection, setActiveSection] = useState(null);

  // Function to toggle the active section
  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="p-4 fixed top-0 left-0 w-full z-10 bg-black">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <a href="/">
              <GiTicTacToe className="h-12 w-12" />
            </a>
          </div>
          <div className="flex-grow flex justify-center space-x-8">
            <a href="/" className="text-white hover:text-gray-300 text-xl">Home</a>
            <a href="/about" className="text-white hover:text-gray-300 text-xl">About</a>
            <a href="#" className="text-white hover:text-gray-300 text-xl">Gameplay</a>
            <a href="/faq" className="text-white hover:text-gray-300 text-xl">FAQ</a>
            <a href="/contact" className="text-white hover:text-gray-300 text-xl">Contact</a>
          </div>
          <div className="ml-auto">
            <a href="https://github.com/SusheelThapa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl">
              <AiFillGithub />
            </a>
          </div>
        </div>
      </nav>

      {/* Gameplay Content */}
      <div className="min-h-screen flex flex-col items-center bg-black text-white px-6 py-12 pt-16 mt-24"> {/* Added pt-16 for spacing below nav */}
        <h1 className="text-5xl font-bold mb-4 text-center">Gameplay</h1>

        {/* How to Play Section */}
        <div className="w-full mt-4 text-center">
          <h2 
            onClick={() => toggleSection("howToPlay")}
            className="text-3xl font-semibold cursor-pointer"
          >
            How to Play
          </h2>
          {activeSection === "howToPlay" && (
            <div className="text-lg leading-relaxed mt-4">
              <p>
                Tic-Tac-Toe is played on a 3x3 grid. Players take turns placing their marks (X or O) in the empty squares. The goal is to get three of your marks in a row—horizontally, vertically, or diagonally.
              </p>
              <ol className="list-decimal list-inside space-y-2 mt-4">
                <li>Select your player type (X or O).</li>
                <li>Click on an empty square to place your mark.</li>
                <li>The first player to align three marks wins!</li>
                <li>If all squares are filled and no player has three in a row, the game ends in a draw.</li>
              </ol>
            </div>
          )}
        </div>

        {/* Gameplay Strategies Section */}
        <div className="w-full mt-8 text-center">
          <h2 
            onClick={() => toggleSection("strategies")}
            className="text-3xl font-semibold cursor-pointer"
          >
            Gameplay Strategies
          </h2>
          {activeSection === "strategies" && (
            <ul className="list-disc list-inside space-y-2 mt-4 text-lg">
              <li>Always start in the center if you're the first player.</li>
              <li>If your opponent plays in the center, take a corner.</li>
              <li>Try to create two ways to win simultaneously.</li>
              <li>Block your opponent's winning moves as soon as possible.</li>
              <li>Play to draw if you cannot win.</li>
            </ul>
          )}
        </div>

        {/* Example Winning Scenario Section */}
        <div className="mt-8 text-center">
          <h2 
            onClick={() => toggleSection("winningScenario")}
            className="text-3xl font-semibold cursor-pointer"
          >
            Example Winning Scenario
          </h2>
          {activeSection === "winningScenario" && (
            <div className="mt-4 text-lg">
              <p>Here’s an example of a winning scenario:</p>
              <div className="grid grid-cols-3 gap-0 mt-4 justify-center">
            <div className="w-16 h-16 flex items-center justify-center border border-white text-3xl">X</div>
            <div className="w-16 h-16 flex items-center justify-center border border-white text-3xl">O</div>
            <div className="w-16 h-16 flex items-center justify-center border border-white text-3xl">X</div>
            <div className="w-16 h-16 flex items-center justify-center border border-white text-3xl">O</div>
            <div className="w-16 h-16 flex items-center justify-center border border-white text-3xl">X</div>
            <div className="w-16 h-16 flex items-center justify-center border border-white text-3xl">O</div>
            <div className="w-16 h-16 flex items-center justify-center border border-white text-3xl">X</div>
            <div className="w-16 h-16 flex items-center justify-center border border-white text-3xl"></div>
            <div className="w-16 h-16 flex items-center justify-center border border-white text-3xl"></div>
          </div>
              <p className="mt-2">In this scenario, X wins with a vertical line in the first column!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
