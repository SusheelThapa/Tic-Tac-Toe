import { useEffect } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import CustomStep from "./CustomStep";
import StickMan from "../../assets/images/stickman.svg";
import ReactDOM from "react-dom";
import "./customCSS.css";

interface Props {
  setTourStatus: (value: boolean) => void;
}

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

  tour.addStep({
    id: "example-step",
    text: "Welcome to our site! Welcome to our site!Welcome to our site!Welcome to our site!", // This could be removed if CustomStep is mandatory
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
        const stepElement = document.querySelector(".shepherd-step-content");
        if (stepElement) {
          ReactDOM.render(
            <CustomStep text="Welcome to our site!" />,
            stepElement
          );
        }
      },
    },
  });
  tour.addStep({
    id: "example-step",
    text: "Welcome to our site! Welcome to our site!Welcome to our site!Welcome to our site!", // This could be removed if CustomStep is mandatory
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
        const stepElement = document.querySelector(".shepherd-step-content");
        if (stepElement) {
          ReactDOM.render(
            <CustomStep text="Welcome to our site!" />,
            stepElement
          );
        }
      },
    },
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
      className="text-white bg-transparent w-full h-full absolute top-0 left-0 flex justify-center items-center z-10 backdrop-blur-md"
    >
      <div className="flex items-center space-x-4 mt-32 shep-tour-start">
        <img src={StickMan} alt="Stick Man" className="w-4/12" />
      </div>
    </div>
  );
};

export default ShepHerdTour;
