import {
  alarmDateInput,
  alarmTimeInput,
  createAlarmBtn,
  createdAlarmsDiv,
  alarmSound,
  repeatAlarmCheckbox,
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
    alert("Alarm date is behind current date!");
    return;
  }

  const timeLeftSpan = document.createElement("span");
  const createdAlarmSlot = document.createElement("div");
  const dateSlotSpan = document.createElement("span");
  const timeSlotSpan = document.createElement("span");
  const faTrash = document.createElement("i");

  createdAlarmSlot.id = alarmID;
  createdAlarmSlot.classList.add("created-alarm-slot");
  dateSlotSpan.classList.add("date-slot-span");
  timeSlotSpan.classList.add("time-slot-span");
  faTrash.classList.add("fa-solid");
  faTrash.classList.add("fa-trash");
  timeLeftSpan.classList.add("time-left");

  dateSlotSpan.innerText = alarmDateInput.value;
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

  timekeepingDevices.alarms.push({
    alarmID,
    date: _inputDate,
    time: _inputTime,
    alarmInterval: createAlarmInterval({
      alarmID,
      timeLeftSpan,
      dateSlotSpan,
      alarmDate,
      checkedRepeat,
    }),
  });

  faTrash.addEventListener("click", (e) => {
    const trashParent = e.target.parentElement;
    const createdAlarmsDiv = trashParent.parentElement;

    createdAlarmsDiv.removeChild(trashParent);

    timekeepingDevices.alarms = timekeepingDevices.alarms.reduce(
      (acc, alarm) => {
        if (alarm.alarmID !== alarmID) return [...acc, alarm];
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
  timeLeftSpan,
  dateSlotSpan,
  alarmDate,
  checkedRepeat,
  alarmID,
}) => {
  const updateCreatedAlarmsUI = () => {
    const difference = alarmDate - Date.now();
    if (difference >= 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      timeLeftSpan.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      clearInterval(alarmInterval);
      alarmSound.play();
      if (checkedRepeat) {
        const nextDayDate = new Date(alarmDate);
        nextDayDate.setDate(nextDayDate.getDate() + 1);
        const getNextDayDate = nextDayDate.toLocaleDateString("bs");

        const alarmIndex = timekeepingDevices.alarms.findIndex(
          (alarm) => alarm.alarmID === alarmID
        );

        dateSlotSpan.textContent = getNextDayDate;

        timekeepingDevices.alarms[alarmIndex].alarmInterval =
          createAlarmInterval({
            timeLeftSpan,
            dateSlotSpan,
            alarmDate: nextDayDate.getTime(),
            checkedRepeat,
            alarmID,
          });

        console.log(timekeepingDevices.alarms);
      }
    }
  };

  updateCreatedAlarmsUI();

  const alarmInterval = setInterval(updateCreatedAlarmsUI, 100);

  return alarmInterval;
};

export default alarmValidation;
