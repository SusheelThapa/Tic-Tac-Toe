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
  "Hello Chief! I'm Agent Tacton, your advanced tactical guide. Are you ready to revolutionize the way you play Tic Tac Toe?",
  "Let's take a moment to consider the environment. Each year, millions of trees are cut down, contributing to habitat loss, climate change, and air pollution. Traditionally, even simple games like Tic Tac Toe have contributed to this through the use of paper.",
  "That's why we've brought you this digital version. By playing Tic Tac Toe here, you’re not just saving paper—you’re helping to preserve our planet’s precious resources.",
  "In this digital arena, every strategic move you make is eco-friendly. You'll battle against me, Agent Tacton, in a high-tech challenge that tests your wits while protecting nature.",
  "As we play, remember that each decision should be made with care and foresight. Think of this game as a metaphor for the choices we face in protecting our environment.",
  "Here’s a tip: Predicting my moves is akin to anticipating the effects of our actions on the environment. Plan wisely and think sustainability.",
  "So, are you ready to challenge your mind and make a difference? Every game you play here contributes to less waste and less environmental strain.",
  "I’m excited to see how you'll tackle these challenges. Are you prepared to outsmart me in a game that benefits our world? Let the match begin!",
  "Remember, every game played digitally is a leaf that stays on a tree. Let’s play smart, play green, and try to win this game!",
  "Ready to leave a positive impact without leaving a carbon footprint? Game on, Chief! Let’s make every move count.",
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
