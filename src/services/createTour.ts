import Shepherd from "shepherd.js";
import { PopperPlacement, Step, StepOptions } from "shepherd.js/step";
import { Tour } from "shepherd.js/tour";

import { TourStep } from "../types/types";
import { cleanupLastHighlighted, toggleHighlight } from "../utils/highlight";
import { displayProgressBar } from "../utils/progressBar";
import { displayInputField } from "../utils/inputField";

// Create a service for creating Shepherd tours
export const createTour = (
  steps: TourStep[],
  tourOptions: {
    useModalOverlay: boolean;
    multiPageTour?: boolean;
    multiPageTourCases?: string[]; // Array of case names for multi-page tours
    inputButtonFunction?: (value: string) => void;
  }
): Tour => {
  const tour = new Shepherd.Tour({
    useModalOverlay: tourOptions.useModalOverlay,
    defaultStepOptions: {
      classes: "shepherd-theme-light",
      cancelIcon: {
        enabled: true,
      },
      scrollTo: { behavior: "smooth", block: "center" },
    },
  });

  steps.forEach((step, index) => {
    let stepConfig: Step | StepOptions = {
      title: step.title,
      text: step.text,
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
          if (step.highlight) {
            console.log(step.input);
          }
        },
        hide() {
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
            const link = document.querySelector(
              `${step.selector} > a`
            ) as HTMLAnchorElement;
            console.log(link);
            if (link) {
              console.log("Link is clicked");
              link.click();
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
