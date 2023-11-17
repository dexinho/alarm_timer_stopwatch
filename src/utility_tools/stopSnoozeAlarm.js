import { alarmRingingDecision, alarmRingingDialog } from "./querySelectors.js";
import { createAlarmInterval } from "./alarmSetup.js";
import timekeepingDevices from "./timekeepingDevices.js";
import { alarmSound } from "./querySelectors.js";

const stopSnoozeAlarm = ({
  timeLeftSpan,
  dateSlotSpan,
  timeSlotSpan,
  checkedRepeat,
  alarmID,
}) => {
  alarmRingingDecision.forEach((decision) => {
    decision.addEventListener("click", () => {
      stopRinging();
      let currentDate = new Date();

      if (decision.id === "turn-off-alarm") {
        if (checkedRepeat) {
          currentDate.setDate(currentDate.getDate() + 1);
          dateSlotSpan.textContent = currentDate.toLocaleDateString("en-bs");
        } else {
          timekeepingDevices.alarms = timekeepingDevices.alarms.reduce(
            (acc, alarm) => {
              if (alarm.alarmID !== alarmID) return [...acc, alarm];
              else return acc;
            },
            []
          );
          return;
        }
      } else if (decision.id === "snooze-alarm") {
        currentDate.setMinutes(currentDate.getMinutes() + 5);
      }

      const alarmIndex = timekeepingDevices.alarms.findIndex(
        (alarm) => alarm.alarmID === alarmID
      );

      timekeepingDevices.alarms[alarmIndex].alarmInterval = createAlarmInterval(
        {
          alarmID,
          timeLeftSpan,
          dateSlotSpan,
          timeSlotSpan,
          alarmDate: currentDate.getTime(),
          checkedRepeat,
        }
      );
    });
  });
};

const stopRinging = () => {
  alarmRingingDialog.close();
  alarmSound.pause();
  alarmSound.currentTime = 0;
};

export default stopSnoozeAlarm;
