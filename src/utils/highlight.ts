import { HowToPlay } from "../types/types";

export const toggleHighlight = (elementId: string | null, action: string) => {
  if (elementId) {
    const element = document.querySelector(elementId);
    if (element) {
      element.classList[action as "add" | "remove"]("highlighted");
    }
  }
};

export const cleanupLastHighlighted = (tourSteps: HowToPlay[]) => {
  if (tourSteps.length > 0) {
    const lastStep = tourSteps[tourSteps.length - 1];
    if (lastStep.highlight) {
      toggleHighlight(lastStep.element, "remove");
    }
  }
};
