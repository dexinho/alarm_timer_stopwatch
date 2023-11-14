import { alarmDateInput, alarmTimeInput } from "./querySelectors.js";
import { createAlarmBtn } from "./querySelectors.js";

const alarmValidation = () => {
  createAlarmBtn.addEventListener("click", () => {
    if (dateValidation() && timeValidation()) {
      console.log("dobar");
    }
  });
};

const dateValidation = () => {
  const date = alarmDateInput.value.split("/");
  const day = parseInt(date[0], 10);
  const month = parseInt(date[1], 10);
  const year = parseInt(date[2], 10);

  const finalDate = new Date(year, month - 1, day);

  if (
    day === finalDate.getDate() &&
    month === finalDate.getMonth() + 1 &&
    year === finalDate.getFullYear()
  )
    return true;
};

const timeValidation = () => {
  const time = alarmTimeInput.value.split(":");
  const hours = parseInt(time[0], 10);
  const minutes = parseInt(time[1], 10);
  const seconds = parseInt(time[2], 10);

  if (
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59 &&
    seconds >= 0 &&
    seconds <= 59
  )
    return true;
};

export default alarmValidation;
