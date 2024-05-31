import { useEffect } from "react";
import ReactDOM from "react-dom";

import Shepherd from "shepherd.js";

import TypingText from "./TypingText";

import StickMan from "../../assets/images/stickman.svg";

import "../../assets/css/customCSS.css";

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

const setupTour = (setTourStatus: (value: boolean) => void) => {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
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
  tour.on("complete", () => setTourStatus(false));
  tour.on("cancel", () => setTourStatus(false));
};

const ShepHerdTour = ({ setTourStatus }: Props) => {
  useEffect(() => {
    setupTour(setTourStatus);
  }, [setTourStatus]);
  return (
    <div
      id="shepherd-tour"
      className="text-white bg-transparent w-full h-full absolute top-0 left-0 flex justify-center items-center z-10 backdrop-blur-lg"
    >
      <div className="flex items-center justify-between space-x-4 mr-24 ">
        <img src={StickMan} alt="Stick Man" className="w-5/12" />
      </div>
    </div>
  );
};

export default ShepHerdTour;
