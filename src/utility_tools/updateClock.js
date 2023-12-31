import {
  hoursLeftDigit,
  hoursRightDigit,
  minutesLeftDigit,
  minutesRightDigit,
  secondsLeftDigit,
  secondsRightDigit,
} from "./querySelectors.js";
import timekeepingDevices from "./timekeepingDevices.js";

const startClock = () => {
  updateClock();
  setInterval(updateClock, 100);
};

const updateClock= () => {
  let date = new Date();

  let hours = ("0" + date.getHours().toString()).slice(-2);
  let minutes = ("0" + date.getMinutes().toString()).slice(-2);
  let seconds = ("0" + date.getSeconds().toString()).slice(-2);

  hoursLeftDigit.innerText = hours.slice(0, 1);
  hoursRightDigit.innerText = hours.slice(1, 2);
  minutesLeftDigit.innerText = minutes.slice(0, 1);
  minutesRightDigit.innerText = minutes.slice(1, 2);
  secondsLeftDigit.innerText = seconds.slice(0, 1);
  secondsRightDigit.innerText = seconds.slice(1, 2);

  let currentTime = Date.now()
  timekeepingDevices.currentTime = currentTime;
};

export default startClock;
