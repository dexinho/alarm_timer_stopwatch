import { timerDigits, timerBtns } from "./querySelectors.js";
import timekeepingDevices from "./timekeepingDevices.js";

const timerSetup = () => {
  timerBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "start-timer-btn") {
        button.id = "pause-timer-btn";
        button.textContent = "PAUSE";
        startTimer();
      } else if (button.id === "pause-timer-btn") {
        button.id = "start-timer-btn";
        button.textContent = "START";
        pauseTimer();
      } else if (button.id === "reset-timer-btn") {
        resetTimer();
      }
    });
  });
};

const startTimer = () => {
  let currentTime = timekeepingDevices.timers.timerTime;
  let correctTimerInput = true;

  timerDigits.forEach((digit) => {
    if (digit.id === "timer-seconds") {
      if (digit.value > 60) correctTimerInput = false;
      currentTime = digit.value * 1000 + currentTime;
    } else if (digit.id === "timer-minutes") {
      if (digit.value > 60) correctTimerInput = false;
      currentTime = digit.value * 60 * 1000 + currentTime;
    } else if (digit.id === "timer-hours")
      currentTime = digit.value * 60 * 60 * 1000 + currentTime;
  });
  const timerInterval = setInterval(() => {
    if (!correctTimerInput) {
      resetTimer()
      alert('Invalid timer input!')
      return
    }

    if (currentTime > 0) {
      currentTime -= 50;
      const seconds = Math.floor(currentTime / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      timerDigits.forEach((digit) => {
        if (digit.id === "timer-seconds")
          digit.value = ("0" + (seconds % 60)).slice(-2);
        if (digit.id === "timer-minutes")
          digit.value = ("0" + (minutes % 60)).slice(-2);
        if (digit.id === "timer-hours")
          digit.value = ("0" + (hours % 60)).slice(-2);
      });

      timekeepingDevices.timers.timerTime = currentTime;
    }
  }, 50);

  timekeepingDevices.timers.timerInterval = timerInterval;
};

const pauseTimer = () => {
  timekeepingDevices.timers.timerTime = 0;
  clearInterval(timekeepingDevices.timers.timerInterval);
};

const resetTimer = () => {
  timerBtns.forEach((button) => {
    if (button.id === "pause-timer-btn") {
      button.id = "start-timer-btn";
      button.textContent = "START";
    }
  });

  timerDigits.forEach((digit) => (digit.value = "00"));

  clearInterval(timekeepingDevices.timers.timerInterval);
  timekeepingDevices.timers.timerTime = 0;
};

export default timerSetup;
