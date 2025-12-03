import { inputToArrayLines } from "../../utils/inputToArray.ts";

const findNextDigit = (
  batteryBank: string,
  lastIndex: number,
  startIndex?: number
) => {
  let foundDigit;
  let position;
  for (let searchInt = 9; searchInt >= 0; searchInt--) {
    position =
      startIndex !== undefined
        ? batteryBank.lastIndexOf(searchInt.toString())
        : batteryBank.indexOf(searchInt.toString());
    if (
      position !== -1 &&
      (startIndex !== undefined
        ? position > startIndex
        : position !== lastIndex)
    ) {
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

    const firstDigit = findNextDigit(batteryBank, lastIndex);
    if (
      firstDigit.foundDigit === undefined ||
      firstDigit.position === undefined
    ) {
      break;
    }

    const secondDigit = findNextDigit(
      batteryBank,
      lastIndex,
      firstDigit.position
    );
    const joltage = Number(`${firstDigit.foundDigit}${secondDigit.foundDigit}`);
    sum = sum + joltage;
  }
  return sum;
};

const expectedFirstSolution = "17196";

const second = (input: string) => {
  const data = inputToArrayLines(input);
  let sum = 0;
  for (const batteryBank of data) {
    const lastIndex = batteryBank.length - 1;
    let joltage = "";
    let startPosition;

    for (let i = 1; i <= 12; i++) {
      const nextDigit = findNextDigit(batteryBank, lastIndex, startPosition);
      if (
        nextDigit.foundDigit === undefined ||
        nextDigit.position === undefined
      ) {
        console.log(
          "** error in search **",
          batteryBank,
          i,
          nextDigit.foundDigit
        );
        break;
      }
      startPosition = nextDigit.position;
      joltage = `${joltage}${nextDigit.foundDigit}`;
    }
    sum = sum + Number(joltage);
  }
  return sum;
};

const expectedSecondSolution = "solution 2";

export { expectedFirstSolution, expectedSecondSolution, first, second };
