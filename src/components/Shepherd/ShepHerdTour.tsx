import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Shepherd from "shepherd.js";

import useSound, { StopFunction } from "use-sound";

import TypingText from "./TypingText";

import StickMan from "../../assets/images/stickman.svg";
import backgroundAudio from "../../assets/audio/backgroundd.mp3";
import "../../assets/css/customCSS.css";
import { FaPause, FaPlay } from "react-icons/fa";

interface Props {
  setTourStatus: (value: boolean) => void;
}

const game_intro = [
  "Welcome to the Ultimate Tic Tac Toe!",
  "Say goodbye to paper—play digitally!",
  "Simple to learn, a challenge to master. Are you ready?",
  "Think ahead. Plan your moves. Outsmart your opponent.",
  "Win or lose, every game is a chance to grow stronger. Ready for another?",
  "Enjoy the game! Make every move count!",
];

const setupTour = (
  setTourStatus: (value: boolean) => void,
  stop: StopFunction
) => {
  const tour = new Shepherd.Tour({
    useModalOverlay: false,
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
      classes: "shepherd-theme-custom",
    },
  });

  game_intro.forEach((text, index) => {
    tour.addStep({
      id: `intro-step-${index}`,
      text: `<div id="typing-text-${index}"></div>`,
      attachTo: {
        element: null,
        on: "bottom",
      },
      buttons: [
        {
          action: () => {
            tour.next();
          },
          text: ">>",
        },
      ],
      when: {
        show: function () {
          const placeholder = document.querySelector(`#typing-text-${index}`);
          if (placeholder) {
            console.log("Placeholder found.");
            ReactDOM.render(<TypingText text={text} />, placeholder);
          } else {
            console.log("Placeholder not found.");
          }
        },
      },
    });
  });

  tour.start();

  ["complete", "cancel"].forEach((event) =>
    Shepherd.on(event, () => {
      setTourStatus(false);

      stop();
    })
  );
};

const ShepHerdTour = ({ setTourStatus }: Props) => {
  const [initialized, setInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track whether audio is playing
  const [play, { stop }] = useSound(backgroundAudio, {
    loop: true,
    onend: () => setIsPlaying(false),
  });

  useEffect(() => {
    if (!initialized) {
      setupTour(setTourStatus, stop);
      setInitialized(true);

      return () => {
        stop();
        console.log("Component unmounted, audio stopped.");
      };
    }
  }, [initialized, setTourStatus, play, stop]);

  const togglePlay = () => {
    console.log("Playing called");

    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
    console.log(`Audio is now ${isPlaying ? "playing" : "stopped"}.`);
  };

  return (
    <>
      <button
        onClick={togglePlay}
        className="play-pause-btn absolute top-4 right-4 bg-none border-none text-white text-2xl z-[20] cursor-pointer"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div
        id="shepherd-tour"
        className="text-white bg-transparent w-full h-full absolute top-0 left-0 flex justify-center items-center z-10 backdrop-blur-lg"
      >
        <div className="flex items-center justify-between space-x-4 mr-24 ">
          <img src={StickMan} alt="Stick Man" className="w-5/12" />
        </div>
      </div>
    </>
  );
};

export default ShepHerdTour;
