import { clockDiv } from "./querySelectors.js";
import timekeepingDevices from "./timekeepingDevices.js";

const updateClock = () => {
  setInterval(() => {
    let currentTime = new Date();
    timekeepingDevices.currentTime = currentTime;

    let hours = ("0" + currentTime.getHours().toString()).slice(-2);
    let minutes = ("0" + currentTime.getMinutes().toString()).slice(-2);
    let seconds = ("0" + currentTime.getSeconds().toString()).slice(-2);

    clockDiv.innerText = `${hours}:${minutes}:${seconds}`;
  }, 1000);
};

export default updateClock;
