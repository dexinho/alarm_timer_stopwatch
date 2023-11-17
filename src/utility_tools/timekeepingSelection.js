import {
  timekeepingChoices,
  timekeepingDivs,
  clockDiv,
  container,
} from "./querySelectors.js";

const timekeepingSelection = () => {
  timekeepingChoices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
      timekeepingChoices.forEach((choice, index) => {
        choice.classList.remove("border-bottom");
        timekeepingDivs[index].style.display = "none";
      });
      choice.classList.add("border-bottom");
      timekeepingDivs[index].style.display = "flex";

      if (choice.id === "alarm-selected") {
        container.style.backgroundColor = "var(--alarm-background-color)";
        clockDiv.style.borderColor = "var(--alarm-clock-color)";
      } else if (choice.id === "stopwatch-selected") {
        container.style.backgroundColor = "var(--stopwatch-background-color)";
        clockDiv.style.borderColor = "var(--stopwatch-clock-color)";
      } else if (choice.id === "timer-selected") {
        container.style.backgroundColor = "var(--timer-background-color)";
        clockDiv.style.borderColor = "var(--timer-clock-color)";
      }
    });
  });
};

export default timekeepingSelection;
