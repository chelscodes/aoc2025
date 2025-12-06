// only checking for TWICE repeated numbers, will always be copied from middle

import { inputToArrayCommas } from "../../utils/inputToArray.ts";

const first = (input: string) => {
  const data = inputToArrayCommas(input);

  const invalidNumbers = [];

  for (const range of data) {
    const fullRange = range.split("-");
    const start = Number(fullRange[0]);
    const end = Number(fullRange[1]);

    for (let i = start; i <= end; i++) {
      const length = i.toString().length;
      // Odd lengths will never be a match
      if (length % 2 !== 0) {
        continue;
      }
      // split in half
      const middle = length / 2;
      const firstHalf = i.toString().slice(0, middle);
      const secondHalf = i.toString().slice(middle);
      if (firstHalf === secondHalf) {
        invalidNumbers.push(i);
        continue;
      }
    }
  }
  const sum = invalidNumbers.reduce((acc, currentValue) => acc + currentValue);

  return sum;
};

// example answer: 1227775554
const expectedFirstSolution = "23701357374";

// look at first half, digit by digit
const second = (input: string) => {
  const data = inputToArrayCommas(input);

  const invalidNumbers = [];

  for (const range of data) {
    const start = Number(range.split("-")[0]);
    const end = Number(range.split("-")[1]);

    for (let id = start; id <= end; id++) {
      const length = id.toString().length;

      // split in half
      const middle = Math.floor(length / 2);
      const firstHalf = id.toString().slice(0, middle);
      const secondHalf = id.toString().slice(middle);
      // if can be halved, skip rest of logic
      if (firstHalf === secondHalf) {
        invalidNumbers.push(id);
        continue;
      }

      const idString = id.toString();
      // go through break into 1, 2, 3, etc.
      for (let j = 1; j <= middle; j++) {
        // if can't be broken up evenly, skip number
        if (idString.length % j !== 0) {
          continue;
        }
        // break into pieces, will be more than 2
        const firstPart = idString.substring(0, j);
        const secondPart = idString.substring(j, 2 * j);
        const thirdPart = idString.substring(2 * j, 3 * j);
        if (firstPart !== secondPart) {
          continue;
        }
        if (firstPart !== thirdPart) {
          continue;
        }
        if (length === j * 3) {
          invalidNumbers.push(id);
          break;
        }
        const fourthPart = idString.substring(3 * j, 4 * j);
        if (firstPart !== fourthPart) {
          continue;
        }
        if (length === j * 4) {
          invalidNumbers.push(id);
          break;
        }
        const fifthPart = idString.substring(4 * j, 5 * j);
        if (firstPart !== fifthPart) {
          continue;
        }
        if (length === j * 5) {
          invalidNumbers.push(id);
          break;
        }
        const sixthPart = idString.substring(5 * j, 6 * j);
        if (firstPart !== sixthPart) {
          continue;
        }
        if (length === j * 6) {
          invalidNumbers.push(id);
          break;
        }
        const seventhPart = idString.substring(6 * j, 7 * j);
        if (firstPart !== seventhPart) {
          continue;
        }
        if (length === j * 7) {
          invalidNumbers.push(id);
          break;
        }
        const eighthPart = idString.substring(7 * j, 8 * j);
        if (firstPart !== eighthPart) {
          continue;
        }
        if (length === j * 8) {
          invalidNumbers.push(id);
          break;
        }
      }
    }
  }
  const sum = invalidNumbers.reduce((acc, currentValue) => acc + currentValue);
  return sum;
};

// example answer: 4174379265
const expectedSecondSolution = "34284458938";

export { expectedFirstSolution, expectedSecondSolution, first, second };
