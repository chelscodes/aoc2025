// how many rolls of paper next to each roll
// skip .
// go through each row, find next roll of paper
// look at left and right, then top and bottom

import { inputToArrayLines } from "../../utils/inputToArray.ts";

const first = (input: string) => {
  const data = inputToArrayLines(input)
  let totalAccessibleRolls = 0

  for (let row = 0; row < data.length; row++) {
    const currentRow = data[row]
    for (let space = 0; space < currentRow.length; space++) {
      const currentSpace = currentRow[space]

      if (currentSpace === ".") {
        continue
      }
      
      let adjacentRollCount = 0
      if (currentRow[space - 1] === "@") {
        adjacentRollCount++
      }
      if (currentRow[space + 1] === "@") {
        adjacentRollCount++
      }
      const previousRow = data[row - 1]
      if (previousRow) {
        for (let topPosition = space - 1; topPosition <= space + 1; topPosition++) {
          if (previousRow[topPosition] === "@") {
            adjacentRollCount++
          }
        }
      }
      const nextRow = data[row + 1]
      if (nextRow) {
        for (let bottomPosition = space - 1; bottomPosition <= space + 1; bottomPosition++) {
          if (nextRow[bottomPosition] === "@") {
            adjacentRollCount++
          }
        }
      }
      
      if (adjacentRollCount < 4) {
        totalAccessibleRolls++
      }

    }
  }
  
  return totalAccessibleRolls;
};

const expectedFirstSolution = 1372;

const second = (input: string) => {
  // console.log(input);
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
