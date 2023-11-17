import { stopwatchBtns } from "./querySelectors.js";
import { stopwatchDigits } from "./querySelectors.js";
import timekeepingDevices from "./timekeepingDevices.js";

const stopwatchSetup = () => {
  stopwatchBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "start-stopwatch-btn") {
        button.id = "pause-stopwatch-btn";
        button.textContent = "PAUSE";
        startStopwatch();
      } else if (button.id === "pause-stopwatch-btn") {
        button.id = "start-stopwatch-btn";
        button.textContent = "START";
        pauseStopwatch();
      } else if (button.id === "reset-stopwatch-btn") {
        resetStopwatch();
      }
    });
  });
};

const startStopwatch = () => {
  let currentStopwatchTime = timekeepingDevices.stopwatch.stopwatchTime;
  let increment = timekeepingDevices.stopwatch.increment;

  const stopwatchInterval = setInterval(() => {
    currentStopwatchTime += increment;
    let milliseconds = currentStopwatchTime;
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    stopwatchDigits.forEach((digits) => {
      if (digits.id === "stopwatch-milliseconds")
        digits.innerText = ("00" + (milliseconds % 1000).toString()).slice(-3);
      if (digits.id === "stopwatch-seconds")
        digits.innerText = ("0" + (seconds % 60).toString()).slice(-2);
      if (digits.id === "stopwatch-minutes")
        digits.innerText = ("0" + (minutes % 60).toString()).slice(-2);
      if (digits.id === "stopwatch-hours")
        digits.innerText = ("0" + (hours % 24).toString()).slice(-2);
    });

    timekeepingDevices.stopwatch.stopwatchTime = currentStopwatchTime;
  }, increment);

  timekeepingDevices.stopwatch.stopwatchInterval = stopwatchInterval;
};

const resetStopwatch = () => {
  clearInterval(timekeepingDevices.stopwatch.stopwatchInterval);
  timekeepingDevices.stopwatch.stopwatchTime = 0;
  stopwatchDigits.forEach((digits) => {
    digits.textContent = "00";
  });

  stopwatchBtns.forEach((button) => {
    if (button.id === "pause-stopwatch-btn") {
      button.id = "start-stopwatch-btn";
      button.textContent = "START";
    }
  });
};

const pauseStopwatch = () => {
  clearInterval(timekeepingDevices.stopwatch.stopwatchInterval);
};


export default stopwatchSetup;
