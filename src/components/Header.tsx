import { FaGithub } from "react-icons/fa6";
import { GoMute, GoUnmute } from "react-icons/go";
import { Link } from "react-router-dom";

interface Props {
  mute: boolean;
  handleMuteButton: (value: boolean) => void;
}

const Header = ({ mute, handleMuteButton }: Props) => {
  return (
    <div className="flex justify-between items-center mx-4 sm:mx-10 gap-4 sm:gap-10 pt-4">
      <div className="rounded-md">
        <Link to="/">
          <img src="/images/logo.png" alt="logo" className="w-24 sm:w-20" />
        </Link>
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
          Logo
        </span>
      </div>
      <ul
        id="header"
        className="px-4 sm:px-16 mx-4 sm:mx-10 flex justify-start items-center list-none w-full text-base sm:text-lg font-semibold tracking-widest gap-16"
      >
        <li className="relative group cursor-pointer p-2 px-4" id="home">
          <Link to="/">Home</Link>
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Go to Home
          </span>
        </li>

        <li className="relative group cursor-pointer p-2 px-4" id="developer">
          <Link to="/developer">Developer</Link>
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Know about developer
          </span>
        </li>
        <li className="relative group cursor-pointer p-2 px-4" id="faq">
          <Link to="/faq">FAQ</Link>
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Frequently Asked Questions
          </span>
        </li>
      </ul>

      <div
        id="github-repository"
        className="relative group text-2xl sm:text-3xl cursor-pointer m-1"
      >
        <a href="https://github.com/SusheelThapa/Tic-Tac-Toe">
          <FaGithub />
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            GitHub Repository
          </span>
        </a>
      </div>
      <div
        id="mute-unmute-button"
        className="relative group text-2xl sm:text-3xl cursor-pointer m-1"
        onClick={() => handleMuteButton(!mute)}
      >
        {mute ? <GoMute /> : <GoUnmute />}
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
          {mute ? "Unmute" : "Mute"}
        </span>
      </div>
    </div>
  );
};

export default Header;
