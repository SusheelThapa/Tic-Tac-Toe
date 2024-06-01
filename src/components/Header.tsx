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
    <div className="flex justify-between items-center mx-10">
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
      <div
        id="mute-unmute-button"
        className="text-5xl cursor-pointer"
        onClick={() => handleMuteButton(!mute)}
      >
        {mute ? <GoMute /> : <GoUnmute />}
      </div>
    </div>
  );
};

export default Header;
