import { alarmSound, alarmRingingDialog, wakeyWakeyDiv, wakeyTimeDiv } from "./querySelectors.js";
import writeLetterByLetter from "./writeLetterByLetter.js";

const alarmRinging = (_alarmDate) => {
  alarmRingingDialog.showModal();
  alarmSound.play();
  writeLetterByLetter({
    field: wakeyWakeyDiv,
    text: "Wakey Wakey",
  });

  wakeyTimeDiv.textContent = new Date(_alarmDate).toLocaleTimeString('bs')
};

export default alarmRinging;
