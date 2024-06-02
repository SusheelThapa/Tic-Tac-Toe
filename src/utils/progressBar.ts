import { Tour } from "shepherd.js/tour";

export const displayProgressBar = (tourObject: Tour) => {
  const currentStepElement = tourObject.currentStep?.el as HTMLElement | null;
  if (currentStepElement) {
    const footer = currentStepElement.querySelector(
      ".shepherd-footer"
    ) as HTMLElement | null;
    if (footer) {
      const progressContainer = document.createElement("div");
      const progressBar = document.createElement("span");

      progressContainer.className = "shepherd-progress-bar";
      const progressPercentage =
        ((tourObject.steps.indexOf(tourObject.currentStep!) + 1) /
          tourObject.steps.length) *
          100 +
        "%";
      progressBar.style.width = progressPercentage;

      progressContainer.appendChild(progressBar);

      const shepherdButton = currentStepElement.querySelector(
        ".shepherd-button"
      ) as HTMLElement | null;
      if (shepherdButton) {
        footer.insertBefore(progressContainer, shepherdButton);
      }
    }
  }
};
