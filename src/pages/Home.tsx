import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-black gap-4">
        <h1 className="text-white text-6xl mb-10 font-black">Tic-Tac-Toe</h1>
        <button className="text-white border-2 border-white text-2xl rounded-2xl px-8 py-2 bg-black hover:bg-white hover:text-black transition ease-in-out duration-300 outline-none">
          <Link to="/new-game" className="block w-full h-full">
            Start New Game
          </Link>
        </button>
      </div>
    </>
  );
};

export default Home;
