import { useState } from "react";
import { GiTicTacToe } from "react-icons/gi";
import { AiFillGithub } from 'react-icons/ai';

const About = () => {
  // State to track which section is open
  const [activeSection, setActiveSection] = useState(null);

  // Function to toggle display of each section
  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white px-6 py-12">
      {/* Navigation Bar */}
      <nav className="p-4 fixed top-0 left-0 w-full z-10 bg-black">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <a href="/">
              <GiTicTacToe className="h-12 w-12" />
            </a>
          </div>
          <div className="flex-grow flex justify-center space-x-8">
            <a href="/" className="text-white hover:text-gray-300 text-lg">Home</a>
            <a href="/about" className="text-white hover:text-gray-300 text-lg">About</a>
            <a href="/gameplay" className="text-white hover:text-gray-300 text-lg">Gameplay</a>
            <a href="/faq" className="text-white hover:text-gray-300 text-lg">FAQ</a>
            <a href="/contact" className="text-white hover:text-gray-300 text-lg">Contact</a>
          </div>
          <div className="ml-auto">
            <a href="https://github.com/SusheelThapa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl">
              <AiFillGithub />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="text-center max-w-3xl mt-24"> {/* Add margin-top to avoid overlapping with nav */}
        <div className="flex justify-center mb-4">
          <GiTicTacToe className="h-16 w-16 text-yellow-500" />
        </div>

        {/* About Tic-Tac-Toe Section */}
        <div>
          <h1 
            onClick={() => toggleSection("about")}
            className="text-5xl font-bold mb-4 cursor-pointer"
          >
            About Tic-Tac-Toe
          </h1>
          {activeSection === "about" && (
            <p className="text-lg mb-6 leading-relaxed">
              Tic-Tac-Toe is a timeless game that has delighted players of all ages for generations. Originating from ancient civilizations, this simple game requires players to take turns marking a square on a 3x3 grid. The goal is to be the first to get three of your marks in a row, either horizontally, vertically, or diagonally. This version of Tic-Tac-Toe introduces a modern twist with enhanced graphics and the option to play against friends or challenge a smart AI opponent that adapts to your strategy, ensuring an engaging experience every time you play.
            </p>
          )}
        </div>

        {/* Features Section */}
        <div>
          <h2 
            onClick={() => toggleSection("features")}
            className="text-3xl font-semibold mt-8 mb-4 cursor-pointer"
          >
            Features
          </h2>
          {activeSection === "features" && (
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>**Play with Friends or Challenge AI:** Enjoy a competitive experience by playing against friends locally or test your skills against our advanced AI that learns from your moves.</li>
              <li>**Modern, User-Friendly Design:** The interface is crafted to provide a seamless gaming experience with vibrant visuals and intuitive controls.</li>
              <li>**Accessible for All Ages and Skill Levels:** Whether you're a beginner or an experienced player, Tic-Tac-Toe offers simple rules that everyone can understand and enjoy.</li>
              <li>**Responsive Interface:** Our design ensures that you can enjoy the game on any device, be it mobile, tablet, or desktop, without compromising on quality.</li>
              <li>**Light and Dark Modes:** Choose between light and dark themes to suit your preference and create a comfortable gaming environment.</li>
            </ul>
          )}
        </div>

        {/* How to Play Section */}
        <div>
          <h2 
            onClick={() => toggleSection("howToPlay")}
            className="text-3xl font-semibold mt-8 mb-4 cursor-pointer"
          >
            How to Play
          </h2>
          {activeSection === "howToPlay" && (
            <p className="text-lg mb-6 leading-relaxed">
              To play Tic-Tac-Toe, simply click on an empty square to place your mark (either an "X" or "O"). The objective is to be the first player to align three of your marks in a row, either horizontally, vertically, or diagonally. If all squares are filled without any player achieving three in a row, the game will end in a draw. Use strategy to block your opponent while creating opportunities for yourself to win!
            </p>
          )}
        </div>

        {/* Strategy Tips Section */}
        <div>
          <h2 
            onClick={() => toggleSection("strategyTips")}
            className="text-3xl font-semibold mt-8 mb-4 cursor-pointer"
          >
            Strategy Tips
          </h2>
          {activeSection === "strategyTips" && (
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>**Start in the Center:** If you get the first turn, always start in the center to maximize your chances of winning.</li>
              <li>**Block Your Opponent:** Always keep an eye on your opponent's moves and block them if they are about to win.</li>
              <li>**Create Multiple Opportunities:** Try to set up a situation where you have two potential winning moves at once, making it impossible for your opponent to block them both.</li>
              <li>**Utilize Corners:** Corners can give you strategic advantages and are key in forming lines of three.</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;