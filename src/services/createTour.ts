import Shepherd from "shepherd.js";
import { PopperPlacement, Step, StepOptions } from "shepherd.js/step";
import { Tour } from "shepherd.js/tour";

import { TourStep } from "../types/types";
import { cleanupLastHighlighted, toggleHighlight } from "../utils/highlight";
import { displayProgressBar } from "../utils/progressBar";
import { displayInputField } from "../utils/inputField";

import one from "../assets/images/stickman/one.gif";
import two from "../assets/images/stickman/two.gif";
import three from "../assets/images/stickman/three.gif";
import four from "../assets/images/stickman/four.gif";
import five from "../assets/images/stickman/five.gif";
import six from "../assets/images/stickman/six.gif";
import seven from "../assets/images/stickman/seven.gif";
import eight from "../assets/images/stickman/eight.gif";
import nine from "../assets/images/stickman/nine.gif";
import ten from "../assets/images/stickman/ten.gif";
import eleven from "../assets/images/stickman/eleven.gif";

import { getRandomNumber } from "../utils/getRandomNumber";

const stickManGIFList = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
];

// Create a service for creating Shepherd tours
export const createTour = (
  steps: TourStep[],
  tourOptions: {
    useModalOverlay: boolean;
    multiPageTour?: boolean;
    multiPageTourCases?: string[]; // Array of case names for multi-page tours
    inputButtonFunction?: (value: string) => void;
    showGIF?: boolean;
  }
): Tour => {
  const tour = new Shepherd.Tour({
    useModalOverlay: tourOptions.useModalOverlay,
    exitOnEsc: true,
    keyboardNavigation: true,
    defaultStepOptions: {
      classes: "shepherd-theme-light shadow-md bg-purple-dark",
      cancelIcon: {
        enabled: true,
      },
      scrollTo: { behavior: "smooth", block: "center" },
    },
  });

  steps.forEach((step, index) => {
    let stepConfig: Step | StepOptions = {
      title: step.title,
      text: tourOptions.showGIF
        ? `<div class="flex justify-center items-center w-full my-4 rounded-xl">
            <img src="${
              stickManGIFList[getRandomNumber(0, stickManGIFList.length -1)]
            }" class="border-8 border-black p-2 bg-white grayscale overflow-hidden w-3/4 h-[8rem] rounded-xl"/>
          </div>
          <p>${step.text}</p>
          `
        : step.text,
      attachTo: {
        element: step.element,
        on: step.position as PopperPlacement,
      },
      when: {
        show() {
          if (step.highlight) {
            toggleHighlight(step.element, "add");
          }
          if (step.progressBar !== false) {
            displayProgressBar(tour);
          }
          if (!step.highlight && step.input) {
            displayInputField(tour, step.input_placeholder);
          }
        },
        hide() {
          const el = document.querySelector(
            ".shepherd-element.shepherd-enabled"
          );
          if (el) {
            el.classList.remove("animate-popup-open");
            el.classList.add("animate-popup-close");
          }
          if (step.highlight) {
            toggleHighlight(step.element, "remove");
          }
          if (step.progressBar !== false) {
            displayProgressBar(tour);
          }
        },
      },
      buttons: [
        ...(index !== 0 ? [{ text: "Back", action: tour.back }] : []),
        {
          text: step.input
            ? "Submit"
            : index === steps.length - 1
            ? "End Tour"
            : "Next",
          action: step.input
            ? () => {
                if (tourOptions.inputButtonFunction) {
                  const inputElement = document.querySelector(
                    "#player-name"
                  ) as HTMLInputElement;
                  const inputValue = inputElement ? inputElement.value : "";
                  tourOptions.inputButtonFunction(inputValue);
                }
                tour.next();
              }
            : tour.next,
        },
      ],
    };

    if (
      tourOptions.multiPageTour &&
      tourOptions.multiPageTourCases?.includes(step.title)
    ) {
      stepConfig = {
        ...stepConfig,
        beforeShowPromise: function () {
          return new Promise<void>((resolve) => {
            const element = document.querySelector(`${step.selector}`) as
              | HTMLAnchorElement
              | HTMLButtonElement;
            console.log(element);
            if (element) {
              element.click();
            }
            resolve();
          });
        },
      };
    }

    tour.addStep(stepConfig);
  });

  tour.on("complete", cleanupLastHighlighted);
  tour.on("cancel", cleanupLastHighlighted);

  return tour;
};
