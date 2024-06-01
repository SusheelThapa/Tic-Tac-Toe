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
    <div className="flex justify-between items-center mx-10 gap-10 pt-4">
      <div className="rounded-md">
        <img src={logo} alt="logo" className="w-20" />
      </div>
      <ul
        id="header"
        className="px-16 mx-10 flex justify-start items-center list-none w-full text-lg font-semibold tracking-widest"
      >
        <li
          className="hover:shadow-sm cursor-pointer "
          onClick={() => how_to_play.start()}
        >
          How to play?
        </li>
      </ul>
      <div id="quine-vote" className="text-3xl cursor-pointer m-1">
        <a href="#">
          <BiSolidUpvote />
        </a>
      </div>
      <div id="github-repository" className="text-3xl cursor-pointer m-1">
        <a href="https://github.com/SusheelThapa/Tic-Tac-Toe">
          <FaGithub />
        </a>
      </div>

      <div
        id="mute-unmute-button"
        className="text-3xl cursor-pointer m-1"
        onClick={() => handleMuteButton(!mute)}
      >
        {mute ? <GoMute /> : <GoUnmute />}
      </div>
    </div>
  );
};

export default Header;
