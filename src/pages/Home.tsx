import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { GiTicTacToe } from "react-icons/gi";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="p-4 fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
         <div className="text-white text-lg font-bold">
    <a href="#">
        <GiTicTacToe className="h-12 w-12" />
    </a>
</div>
          <div className="flex-grow flex justify-center space-x-8"> 
            <a href="#" className="text-white hover:text-gray-300 text-xl">Home</a>
            <a href="#" className="text-white hover:text-gray-300 text-xl">About</a>
            <a href="#" className="text-white hover:text-gray-300 text-xl">Gameplay</a>
            <a href="" className="text-white hover:text-gray-300 text-xl">FAQ</a>
            <a href="#" className="text-white hover:text-gray-300 text-xl">Contact</a>
          </div>
          <div className="text-white text-lg font-bold"> 
            <span></span>
          </div>
        </div>
      </nav>
  
       <main className="flex flex-col justify-center items-center flex-grow bg-black gap-4 mt-16"> {/* Add mt-16 to push content below fixed navbar */}
        <h1 className="text-white text-6xl mb-10 font-black">Tic-Tac-Toe</h1>
        <p className="text-white text-xl mb-8 text-center">Welcome to Tic-Tac-Toe!<br/> Challenge your friends or play against the computer in this classic game. <br /> Can you get three in a row?</p>
        <button className="text-white border-2 border-white text-2xl rounded-2xl px-8 py-2 bg-black hover:bg-white hover:text-black transition ease-in-out duration-300 outline-none">
          <Link to="/game-mode-selector" className="block w-full h-full">
            Start New Game
          </Link>
        </button>
      </main>
      
      <footer className="p-4">
  <div className="container mx-auto text-center">
    <div className="flex justify-center">
      <a href="https://x.com/susheelthapaa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl mr-8">
        <FaXTwitter />
      </a>
      <a href="https://github.com/SusheelThapa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl mr-8"> 
        <AiFillGithub />
      </a>
      <a href="https://facebook.com/susheelthapaa/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl mr-8"> 
        <AiFillFacebook />
      </a>
      <a href="https://www.linkedin.com/in/susheelthapa/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl"> 
        <FaLinkedin />
      </a>
    </div>
 </div>
</footer>

    </div>
  );
};

export default Home;
