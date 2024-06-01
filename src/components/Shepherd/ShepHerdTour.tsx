import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Shepherd from "shepherd.js";

// @ts-ignore
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
  "Hello Chief! I'm Agent Tacton, your tactical guide. Ready to revolutionize Tic Tac Toe?",
  "Each year, millions of trees are cut down, impacting our planet. Traditional Tic Tac Toe contributes to this by using paper.",
  "With this digital version, you’re saving paper and helping preserve our planet's resources.",
  "In this eco-friendly digital arena, every strategic move you make protects nature. You'll challenge me, Agent Tacton, in a high-tech, environmentally conscious game.",
  "Remember, each decision here reflects the choices we face in protecting our environment. Plan wisely and think sustainably.",
  "Are you ready to challenge your mind and make a difference? Every game played here means less waste and less strain on our environment.",
  "Let’s play smart, play green, and win this game! Ready to make a positive impact? Game on, Chief!",
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
      localStorage.setItem("shepherd-tour", "yes");
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
      if (localStorage.getItem("shepherd-tour") != "yes") {
        setupTour(setTourStatus, stop);
        setInitialized(true);
      }
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
        <div className="flex items-center justify-between space-x-4 ">
          <div className="flex items-start justify-start flex-col">
            <img src={StickMan} alt="Stick Man" className="w-4/12" />
            <p className="text-center w-4/12 mt-6 text-2xl font-extrabold tracking-wider ml-4">
              Agent Tacton
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShepHerdTour;
