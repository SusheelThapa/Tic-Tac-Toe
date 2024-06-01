import { FaGithub } from "react-icons/fa6";
import { BiSolidUpvote } from "react-icons/bi";
import logo from "../assets/images/logo.png";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { Tour } from "shepherd.js/tour";

interface Props {
  mute: boolean;
  handleMuteButton: (value: boolean) => void;
  how_to_play: Tour;
}

const Header = ({ mute, handleMuteButton, how_to_play }: Props) => {
  return (
    <div className="flex justify-between items-center mx-4 sm:mx-10 gap-4 sm:gap-10 pt-4">
      <div className="rounded-md">
        <img src={logo} alt="logo" className="w-24 sm:w-20" />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
          Logo
        </span>
      </div>
      <ul
        id="header"
        className="px-4 sm:px-16 mx-4 sm:mx-10 flex justify-start items-center list-none w-full text-base sm:text-lg font-semibold tracking-widest gap-16"
      >
        <li className="relative group cursor-pointer">
          Home
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Go to Home
          </span>
        </li>
        <li className="relative group cursor-pointer" onClick={() => how_to_play.start()}>
          How to play?
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Learn How to Play
          </span>
        </li>
        <li className="relative group cursor-pointer">
          About
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            About Us
          </span>
        </li>
        <li className="relative group cursor-pointer">
          FAQ
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Frequently Asked Questions
          </span>
        </li>
      </ul>
      <div
        id="quine-vote"
        className="relative group text-2xl sm:text-3xl cursor-pointer m-1"
      >
        <a href="#">
          <BiSolidUpvote />
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Vote on Quine
          </span>
        </a>
      </div>
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
