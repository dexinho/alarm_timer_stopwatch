import { createdAlarmsDiv } from "./querySelectors.js";

const alarmChildChange = () => {
  if (createdAlarmsDiv.childElementCount > 0)
    createdAlarmsDiv.style.display = "flex";
  else createdAlarmsDiv.style.display = "none";
};

const alarmChangeObserver = new MutationObserver(alarmChildChange);
alarmChangeObserver.observe(createdAlarmsDiv, { childList: true });

export default alarmChangeObserver;
