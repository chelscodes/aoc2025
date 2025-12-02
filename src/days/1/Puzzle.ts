// import { promises as fsPromises } from "fs";

// 1. format input as array
// 2. start with first 10 elements
// 3. go through each item, split first letter to determine direction, and number for how many steps
// 4. move in correct direction (init at 50), save end position and console.log
// 4a. if movement passes 0 or 99, adjust accordingly

// const testInput = ["R50", "L25", "R21", "L50", "R13", "L59"];

const normalizeDistance = (distance: number) => {
  let newDistance = distance;
  if (distance === 100) {
    newDistance = 0;
  } else if (distance > 100) {
    newDistance = distance % 100;
  }
  return newDistance;
};

const first = (input: string) => {
  const array = input.split(/\r?\n/); // step 1
  let currentPosition = 50;
  let zeroCount = 0;

  for (const item of array) {
    const direction = item.match(/[LR]/)?.[0]; // step 3
    const distance = normalizeDistance(Number(item.substring(1))); // step 3

    let newPosition = currentPosition;
    if (direction === "R") {
      newPosition = currentPosition + distance;
      if (newPosition > 99) {
        newPosition = newPosition - 100;
      }
    } else {
      newPosition = currentPosition - distance;
      if (newPosition < 0) {
        newPosition = 100 + newPosition;
      }
    }

    // check if passes 0 or 9
    if (newPosition === 0) {
      zeroCount++;
    }
    currentPosition = newPosition;
  }

  return zeroCount;
};
const expectedFirstSolution = "1023";

const second = (input: string) => {
  // console.log(input);
  return "solution 2";
};

const expectedSecondSolution = "solution 2";

export { expectedFirstSolution, expectedSecondSolution, first, second };
