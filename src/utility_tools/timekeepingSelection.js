import { timekeepingChoices, timekeepingDivs } from "./querySelectors.js";

const timekeepingSelection = () => {
  timekeepingChoices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
      timekeepingChoices.forEach((choice, index) => {
        choice.classList.remove("border-bottom");
        timekeepingDivs[index].style.display = "none";
      });
      choice.classList.add("border-bottom");
      timekeepingDivs[index].style.display = 'block'
    });
  });
};

export default timekeepingSelection;
