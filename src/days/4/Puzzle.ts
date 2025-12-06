// how many rolls of paper next to each roll
// skip .
// go through each row, find next roll of paper
// look at left and right, then top and bottom

import { inputToArrayLines } from "../../utils/inputToArray.ts";

const searchData = (data: string[]) => {
  let totalAccessibleRolls = 0
  const newDataSet = structuredClone(data)

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
        // remove from the new data set
        const leftSide = space > 0 ? newDataSet[row].substring(0, space) : ""
        const rightSide = space < currentRow.length - 1 ? newDataSet[row].substring(space + 1, currentRow.length) : ""
        newDataSet[row] = `${leftSide}.${rightSide}`
      }

    }
  }

  return {totalAccessibleRolls, newDataSet}
}

const first = (input: string) => {
  const data = inputToArrayLines(input)
  const totalRolls = searchData(data).totalAccessibleRolls

  return totalRolls
};

// example answer = 13
const expectedFirstSolution = 1372;

const second = (input: string) => {
  const data = inputToArrayLines(input)

  let totalRolls = 0
  let lastResult

  let latestData = data
  while (lastResult !== 0) {
    const { totalAccessibleRolls, newDataSet } = searchData(latestData)
    lastResult = totalAccessibleRolls
    totalRolls = totalRolls + lastResult
    latestData = newDataSet
  }
  return totalRolls;
};

// example answer = 43
const expectedSecondSolution = 7922;

export { expectedFirstSolution, expectedSecondSolution, first, second };
