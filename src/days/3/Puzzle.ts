import { inputToArrayLines } from "../../utils/inputToArray.ts";

const findNextDigit = (
  batteryBank: string,
  lastIndex: number,
  startIndex: number
) => {
  let foundDigit;
  let position;
  for (let searchInt = 9; searchInt >= 0; searchInt--) {
    position = batteryBank.indexOf(searchInt.toString(), startIndex);
    if (position !== -1 && position >= startIndex && position < lastIndex) {
      foundDigit = searchInt;
      break;
    }
  }
  return { foundDigit, position };
};

const first = (input: string) => {
  const data = inputToArrayLines(input);

  // construct the number? - see if there's a 9 that's not the last number, pick highest number after that
  // if no 9, see if there's an 8 that's not last, etc.
  let sum = 0;
  for (const batteryBank of data) {
    const lastIndex = batteryBank.length - 1;

    const firstDigit = findNextDigit(batteryBank, lastIndex, 0);
    if (
      firstDigit.foundDigit === undefined ||
      firstDigit.position === undefined
    ) {
      break;
    }

    const secondDigit = findNextDigit(
      batteryBank,
      lastIndex + 1,
      firstDigit.position + 1
    );
    const joltage = Number(`${firstDigit.foundDigit}${secondDigit.foundDigit}`);
    sum = sum + joltage;
  }
  return sum;
};

const expectedFirstSolution = "17196";

const second = (input: string) => {
  const data = inputToArrayLines(input);

  const joltageLength = 12;

  let sum = 0;

  for (const batteryBank of data) {
    let lastIndex = batteryBank.length - joltageLength + 1;
    let joltage = "";
    let startPosition = 0;

    for (let i = 1; i <= joltageLength; i++) {
      // adjust last index so that there's always room for the rest
      const nextDigit = findNextDigit(batteryBank, lastIndex, startPosition);

      if (
        nextDigit.foundDigit === undefined ||
        nextDigit.position === undefined
      ) {
        console.log("** error in search **");
        break;
      }

      joltage = `${joltage}${nextDigit.foundDigit}`;
      startPosition = nextDigit.position + 1;
      lastIndex++;
    }
    sum = sum + Number(joltage);
  }
  return sum;
};

const expectedSecondSolution = "171039099596062";

export { expectedFirstSolution, expectedSecondSolution, first, second };
