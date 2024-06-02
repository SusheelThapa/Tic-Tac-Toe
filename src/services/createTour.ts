import Shepherd from "shepherd.js";
import { PopperPlacement, Step, StepOptions } from "shepherd.js/step";
import { Tour } from "shepherd.js/tour";

import { TourStep } from "../types/types";
import { cleanupLastHighlighted, toggleHighlight } from "../utils/highlight";
import { displayProgressBar } from "../utils/progressBar";

// Create a service for creating Shepherd tours
export const createTour = (
  steps: TourStep[],
  tourOptions: {
    useModalOverlay: boolean;
    multiPageTour?: boolean;
    multiPageTourCases?: string[]; // Array of case names for multi-page tours
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
      when: step.highlight
        ? {
            show() {
              toggleHighlight(step.element, "add");
              displayProgressBar(tour);
            },
            hide: () => {
              toggleHighlight(step.element, "remove");
              displayProgressBar(tour);
            },
          }
        : {
            show() {
              displayProgressBar(tour);
            },
          },
      buttons: [
        ...(index !== 0 ? [{ text: "Back", action: tour.back }] : []),
        {
          text: index === steps.length - 1 ? "End Tour" : "Next",
          action: tour.next,
        },
      ],
    };

    if (
      tourOptions.multiPageTour &&
      tourOptions.multiPageTourCases?.includes(step.title)
    ) {
        console.log("Inside tour function")
        console.log(step.element)
      stepConfig = {
        ...stepConfig,
        beforeShowPromise: function () {
          return new Promise<void>((resolve) => {
            const link = document.querySelector(
              `${step.selector} > a`
            ) as HTMLAnchorElement;
            console.log(link)
            if (link) {
                console.log("Link is clicked")
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
