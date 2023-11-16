import globalVar from "./globalVar.js";

const writeLetterByLetter = ({ text, field }) => {
  const textTimeouts = globalVar.textTimeouts;
  for (let id of textTimeouts) clearTimeout(id);
  textTimeouts.length = 0;

  field.textContent = text[0];

  for (let i = 1; i < text.length; i++) {
    textTimeouts.push(
      setTimeout(() => {
        field.textContent += text[i];
      }, i * 100)
    );
  }
};

export default writeLetterByLetter;
