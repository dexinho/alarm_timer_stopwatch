import { timekeepingChoices } from "./querySelectors.js";

const timekeepingSelection = () => {
  timekeepingChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      timekeepingChoices.forEach((choice) =>
        choice.classList.remove("border-bottom")
      );
      choice.classList.add("border-bottom");
    });
  });
};

export default timekeepingSelection;
