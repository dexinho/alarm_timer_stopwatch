import { alarmInputs } from "./querySelectors.js";

const dateAndTimeAutocomplete = () => {
  alarmInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      {
        if (e.target.value.length === 2 || e.target.value.length === 5)
          e.target.value +=
            e.target.id === "alarm-date-input" ? "." : ":";
      }
    });
  });
};

export default dateAndTimeAutocomplete;
