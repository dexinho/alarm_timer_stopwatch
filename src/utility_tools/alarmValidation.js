import {
  alarmDateInput,
  alarmTimeInput,
  createAlarmBtn,
  createdAlarmsDiv,
} from "./querySelectors.js";
import timekeepingDevices from "./timekeepingDevices.js";

const alarmValidation = () => {
  createAlarmBtn.addEventListener("click", () => {
    const inputDate = dateValidation();
    const inputTime = timeValidation();
    if (inputDate && inputTime) {
      createAndAppendAlarm(inputDate, inputTime);
    }
  });
};

const dateValidation = () => {
  const date = alarmDateInput.value.split(".");
  const day = parseInt(date[0], 10);
  const month = parseInt(date[1], 10);
  const year = parseInt(date[2], 10);

  const finalDate = new Date(year, month - 1, day);

  if (
    alarmDateInput.value.length === 10 &&
    day === finalDate.getDate() &&
    month === finalDate.getMonth() + 1 &&
    year === finalDate.getFullYear()
  )
    return { year, month, day };
};

const timeValidation = () => {
  const time = alarmTimeInput.value.split(":");
  const hours = parseInt(time[0], 10);
  const minutes = parseInt(time[1], 10);
  const seconds = parseInt(time[2], 10);

  if (
    alarmTimeInput.value.length === 8 &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59 &&
    seconds >= 0 &&
    seconds <= 59
  )
    return { hours, minutes, seconds };
};

const createAndAppendAlarm = (_inputDate, _inputTime) => {
  const alarmID = Date.now();
  const alarmDate = new Date(
    _inputDate.year,
    _inputDate.month - 1,
    _inputDate.day,
    _inputTime.hours,
    _inputTime.minutes,
    _inputTime.seconds
  );

  const difference = alarmDate - Date.now();

  if (difference <= 0) {
    alert("Alarm date is behind current date!");
    return;
  }

  const dateInterval = setInterval(() => {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timeLeft.innerText = ` --- ${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      clearInterval(dateInterval);
    }
  }, 100);

  const createdAlarmSlot = document.createElement("div");
  const dateTimeSpan = document.createElement("span");
  const faTrash = document.createElement("i");
  const timeLeft = document.createElement("span");

  createdAlarmSlot.id = alarmID;
  createdAlarmSlot.classList.add("created-alarm-slot");
  dateTimeSpan.classList.add("date-time-span");
  faTrash.classList.add("fa-solid");
  faTrash.classList.add("fa-trash");

  dateTimeSpan.innerText =
    " " + alarmDateInput.value + " " + alarmTimeInput.value;

  createdAlarmsDiv.append(createdAlarmSlot);
  createdAlarmSlot.append(faTrash);
  createdAlarmSlot.append(dateTimeSpan);
  createdAlarmSlot.append(timeLeft);

  timekeepingDevices.alarms.push({
    alarmID,
    date: _inputDate,
    time: _inputTime,
    dateInterval,
  });

  faTrash.addEventListener("click", (e) => {
    const trashParent = e.target.parentElement;
    const createdAlarmsDiv = trashParent.parentElement;

    createdAlarmsDiv.removeChild(trashParent);
    const alarm = timekeepingDevices.alarms.find(
      (alarm) => alarm.alarmID === alarmID
    );

    clearInterval(alarm.dateInterval);
  });
};

export default alarmValidation;
