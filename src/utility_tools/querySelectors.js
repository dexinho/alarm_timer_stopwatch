const clockDiv = document.querySelector("#clock-div");
const timekeepingSelectionDiv = document.querySelector(
  "#timekeeping-selection-div"
);
const alarmDiv = document.querySelector("#alarm-div");
const timerDiv = document.querySelector("#timer-div");
const stopwatchDiv = document.querySelector("#stopwatch-div");
const alarmInput = document.querySelector("#alarm-input");
const timerInput = document.querySelector("#timer-input");
const stopwatchInput = document.querySelector("#stopwatch-input");
const alarmSelected = document.querySelector("#alarm-selected");
const timerSelected = document.querySelector("#timer-selected");
const stopwatchSelected = document.querySelector("#stopwatch-selected");
const timekeepingChoices = document.querySelectorAll(".timekeeping-choices");
const clockDigits = document.querySelectorAll(".clock-digits");
const hoursLeftDigit = document.querySelector("#hours-left-digit");
const hoursRightDigit = document.querySelector("#hours-right-digit");
const minutesLeftDigit = document.querySelector("#minutes-left-digit");
const minutesRightDigit = document.querySelector("#minutes-right-digit");
const secondsLeftDigit = document.querySelector("#seconds-left-digit");
const secondsRightDigit = document.querySelector("#seconds-right-digit");
const alarmDateInput = document.querySelector("#alarm-date-input");
const alarmTimeInput = document.querySelector("#alarm-time-input");
const createAlarmBtn = document.querySelector("#create-alarm-btn");
const alarmInputs = document.querySelectorAll(".alarm-inputs");
const createdAlarmsDiv = document.querySelector("#created-alarms-div");
const repeatAlarmCheckbox = document.querySelector("#repeat-alarm-checkbox");
const alarmSound = document.querySelector("#alarm-sound");
const timekeepingDivs = document.querySelectorAll(".timekeeping-divs");
const container = document.querySelector("#container");
const alarmRingingDialog = document.querySelector("#alarm-ringing-dialog");
const wakeyTimeDiv = document.querySelector("#wakey-time-div");
const alarmRingingDecision = document.querySelectorAll(
  ".alarm-ringing-decision"
);
const wakeyWakeyDiv = document.querySelector("#wakey-wakey-div");
const stopwatchBtns = document.querySelectorAll(".stopwatch-btns");
const stopwatchDigits = document.querySelectorAll('.stopwatch-digits')
const timerBtns = document.querySelectorAll('.timer-btns')
const timerDigits = document.querySelectorAll('.timer-digits')

export {
  timerBtns,
  timerDigits,
  stopwatchDigits,
  stopwatchBtns,
  clockDiv,
  timekeepingSelectionDiv,
  alarmDiv,
  timerDiv,
  stopwatchDiv,
  alarmInput,
  timerInput,
  stopwatchInput,
  alarmSelected,
  timerSelected,
  stopwatchSelected,
  timekeepingChoices,
  clockDigits,
  hoursLeftDigit,
  hoursRightDigit,
  minutesLeftDigit,
  minutesRightDigit,
  secondsLeftDigit,
  secondsRightDigit,
  alarmDateInput,
  alarmTimeInput,
  createAlarmBtn,
  alarmInputs,
  createdAlarmsDiv,
  repeatAlarmCheckbox,
  alarmSound,
  timekeepingDivs,
  container,
  alarmRingingDialog,
  wakeyTimeDiv,
  alarmRingingDecision,
  wakeyWakeyDiv,
};
