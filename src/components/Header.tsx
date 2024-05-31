import logo from "../assets/images/logo.png";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
interface Props {
  mute: boolean;
  handleMuteButton: (value: boolean) => void;
}

const Header = ({ mute, handleMuteButton }: Props) => {
  return (
    <div className="flex justify-between items-center mx-10">
      <div className="rounded-md">
        <img src={logo} alt="logo" className="w-20" />
      </div>
      <div className="text-5xl cursor-pointer" onClick={() => handleMuteButton(!mute)}>
        {mute ? <GoMute /> : <GoUnmute />}
      </div>
    </div>
  );
};

export default Header;
