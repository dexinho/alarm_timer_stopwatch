import {
  alarmDateInput,
  alarmTimeInput,
  createAlarmBtn,
  createdAlarmsDiv,
  repeatAlarmCheckbox,
} from "./querySelectors.js";
import timekeepingDevices from "./timekeepingDevices.js";
import alarmRinging from "./alarmRinging.js";
import stopSnoozeAlarm from "./stopSnoozeAlarm.js";

const alarmSetup = () => {
  createAlarmBtn.addEventListener("click", () => {
    const inputDate = dateValidation();
    const inputTime = timeValidation();
    const matchingFlag = checkAlarmDuplicity(inputDate, inputTime);

    if (inputDate && inputTime && matchingFlag) {
      createAndAppendAlarm(inputDate, inputTime);
    }
  });
};

const checkAlarmDuplicity = (_inputDate, _inputTime) => {
  for (let i = 0; i < timekeepingDevices.alarms.length; i++) {
    let alarm = timekeepingDevices.alarms[i];
    if (
      JSON.stringify(alarm.date) === JSON.stringify(_inputDate) &&
      JSON.stringify(alarm.time) === JSON.stringify(_inputTime)
    ) {
      alert("The same alarm already exists!");
      return false;
    }
  }

  return true;
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
  else {
    alert("Date input is invalid!");
  }
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
  else {
    alert("Time input is invalid!");
  }
};

const createAndAppendAlarm = (_inputDate, _inputTime) => {
  const alarmID = Date.now();
  const checkedRepeat = repeatAlarmCheckbox.checked;
  const alarmDate = new Date(
    _inputDate.year,
    _inputDate.month - 1,
    _inputDate.day,
    _inputTime.hours,
    _inputTime.minutes,
    _inputTime.seconds
  );

  if (alarmDate - Date.now() <= 0) {
    alert("Alarm date has to be ahead of today's date!");
    return;
  }

  const timeLeftSpan = document.createElement("span");
  const dateSlotSpan = document.createElement("span");
  const faTrash = document.createElement("i");
  const timeSlotSpan = document.createElement("span");

  timekeepingDevices.alarms.push({
    alarmID,
    date: _inputDate,
    time: _inputTime,
    alarmInterval: createAlarmInterval({
      alarmID,
      timeLeftSpan,
      dateSlotSpan,
      timeSlotSpan,
      alarmDate,
      checkedRepeat,
    }),
  });

  appendAlarms({ timeSlotSpan, faTrash, alarmID, timeLeftSpan, dateSlotSpan });
  appendTrash(faTrash, alarmID);
};

const appendAlarms = ({
  timeSlotSpan,
  faTrash,
  alarmID,
  timeLeftSpan,
  dateSlotSpan,
}) => {
  const createdAlarmSlot = document.createElement("div");

  createdAlarmSlot.id = alarmID;
  createdAlarmSlot.classList.add("created-alarm-slot");
  dateSlotSpan.classList.add("date-slot-span");
  timeSlotSpan.classList.add("time-slot-span");
  faTrash.classList.add("fa-solid");
  faTrash.classList.add("fa-trash");
  timeLeftSpan.classList.add("time-left");
  timeLeftSpan.id = alarmID / 1000;

  dateSlotSpan.innerText = alarmDateInput.value + '.';
  timeSlotSpan.innerText = alarmTimeInput.value;

  createdAlarmsDiv.append(createdAlarmSlot);
  createdAlarmSlot.append(faTrash);
  createdAlarmSlot.append(dateSlotSpan);
  createdAlarmSlot.append(timeSlotSpan);
  createdAlarmSlot.append(timeLeftSpan);

  if (repeatAlarmCheckbox.checked) {
    const repeatChecked = document.createElement("i");
    repeatChecked.classList.add("fa-solid");
    repeatChecked.classList.add("fa-check");
    createdAlarmSlot.append(repeatChecked);
  }
};

const appendTrash = (_faTrash, _alarmID) => {
  _faTrash.addEventListener("click", (e) => {
    const trashParent = e.target.parentElement;
    const createdAlarmsDiv = trashParent.parentElement;

    createdAlarmsDiv.removeChild(trashParent);

    timekeepingDevices.alarms = timekeepingDevices.alarms.reduce(
      (acc, alarm) => {
        if (alarm.alarmID !== _alarmID) return [...acc, alarm];
        else {
          clearInterval(alarm.alarmInterval);
          return acc;
        }
      },
      []
    );
  });
};

const createAlarmInterval = ({
  alarmID,
  timeLeftSpan,
  dateSlotSpan,
  timeSlotSpan,
  alarmDate,
  checkedRepeat,
}) => {
  const updateCreatedAlarmUI = () => {
    const difference = alarmDate - Date.now();
    if (difference >= 0) {
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      timeSlotSpan.textContent = new Date(alarmDate).toLocaleTimeString('bs')
      timeLeftSpan.textContent = `${days}d ${hours % 24}h ${minutes % 60}m ${
        seconds % 60
      }s`;
    } else {
      clearInterval(alarmInterval)
      alarmRinging(alarmDate);
      stopSnoozeAlarm({
        alarmID,
        timeLeftSpan,
        dateSlotSpan,
        timeSlotSpan,
        checkedRepeat,
      });
    }
  };

  updateCreatedAlarmUI();
  
  const alarmInterval = setInterval(updateCreatedAlarmUI, 100);

  return alarmInterval;
};

export { createAlarmInterval, alarmSetup };
