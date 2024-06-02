import { FaGithub, FaShareNodes } from "react-icons/fa6";
import { BiSolidUpvote } from "react-icons/bi";
import logo from "../assets/images/logo.png";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { Tour } from "shepherd.js/tour";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "./Modal";
import { useState } from "react";

interface Props {
  mute: boolean;
  handleMuteButton: (value: boolean) => void;
  how_to_play: Tour;
  start_tour: Tour;
}

const Header = ({ mute, handleMuteButton, how_to_play, start_tour }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleShare = async () => {
    const shareData = {
      title: "Tic Tac Toe",
      text: "Check out this awesome website!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        setModalMessage(
          "Link copied to clipboard. You can now share it manually."
        );
        setShowModal(true);
      } catch (error) {
        console.error("Failed to copy the link:", error);
      }
    }
  };

  return (
    <div className="flex justify-between items-center mx-4 sm:mx-10 gap-4 sm:gap-10 pt-4">
      <div className="rounded-md">
        <Link to="/">
          <img src={logo} alt="logo" className="w-24 sm:w-20" />
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
        <li
          className="relative group cursor-pointer p-2 px-4"
          id="how-to-play"
          onClick={() => how_to_play.start()}
        >
          How to play?
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Learn How to Play
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
        id="start-tour"
        className="relative group text-2xl sm:text-3xl cursor-pointer m-1"
        onClick={() => start_tour.start()}
      >
        <a href="#">
          <FaPlusCircle />
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Start Tour
          </span>
        </a>
      </div>
      <div
        id="share"
        className="relative group text-2xl sm:text-3xl cursor-pointer m-1"
      >
        <div onClick={handleShare}>
          <FaShareNodes />
          <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 translate-y-10 invisible group-hover:visible bg-white text-black text-sm tracking-widest rounded-md py-1 px-2 whitespace-nowrap">
            Let the world know about this...
          </span>
        </div>
      </div>
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

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {modalMessage}
      </Modal>
    </div>
  );
};

export default Header;
