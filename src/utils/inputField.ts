import { Tour } from "shepherd.js/tour";

export const displayInputField = (
  tourObject: Tour,
  placeholderText: string = "Your text goes here..."
) => {
  console.log("Print One");

  const currentStepElement = tourObject.currentStep?.el as HTMLElement | null;
  if (currentStepElement) {
    console.log("Print Two");

    const header = currentStepElement.querySelector(
      ".shepherd-header"
    ) as HTMLElement | null;
    if (header) {
      console.log("Print Three");

      const inputDiv = document.createElement("div");
      inputDiv.className = "flex justify-center items-center";

      const inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.id = "player-name";
      inputElement.placeholder = placeholderText;
      inputElement.className =
        "bg-gray-300 text-black p-2 my-4 rounded-md w-[95%]";
      inputDiv.appendChild(inputElement);
      header.parentElement?.insertBefore(inputDiv, header.nextSibling);
    }
  }
};
