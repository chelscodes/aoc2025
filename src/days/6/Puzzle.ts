// separate the lines into an array
// look at the last line to determine the number of columns and type of operation
// iterate through the number of columns

import { inputToArrayLines } from "../../utils/inputToArray.ts";

// could either do array of arrays - iterate through the lines and pull the current index for math
// or do array of lines & keep multiple totals going that are edited

const first = (input: string) => {
  const data = inputToArrayLines(input)
  // console.log(data);

  const operations = data.pop()?.trim().split(/[ ]+/)
  if (operations === undefined) return "error in operations"

  const mathLines = data.map((line) => {
    return line.trim().split(/[ ]+/).map((space) => {
      return Number(space)
    })
  })
  const columnsLength = operations.length

  // console.log({ operations, mathLines, columnsLength })

  let overallTotal = 0

  for (let i = 0; i < columnsLength; i++) {
    const operator = operations[i]
    let runningTotal = mathLines[0][i]
    // skip first line
    for (let line = 1; line < mathLines.length; line++) {
      const currentNumber = mathLines[line][i]
      if (operator === "*") {
        runningTotal *= currentNumber
      } else if (operator === "+") {
        runningTotal += currentNumber
      }
    }

    overallTotal = overallTotal + runningTotal
  }

  return overallTotal;
};

// example answer = 4277556
const expectedFirstSolution = 6295830249262;


const second = (input: string) => {
  // console.log(input);

  const data = inputToArrayLines(input)
  // console.log(data);

  const spaceString = data[data.length - 1].trim().split(/[*|+]/)[1]
  const spaceNumber = spaceString.length
  const lineLength = data[0].length

  const operations = data.pop()?.trim().split(/[ ]+/)
  if (operations === undefined) return "error in operations"

  const mathLines = data.map((line) => {
    const newLine = []
    let startIndex = 0
    let endIndex = spaceNumber
    while (endIndex <= lineLength) {
      newLine.push(line.slice(startIndex, endIndex))
      startIndex = endIndex + 1
      endIndex = endIndex + spaceNumber + 1
    }
    return newLine
  })

  const columnsLength = operations.length

  console.log({spaceString, spaceNumber, operations, mathLines})

  let overallTotal = 0

  // iterate through each column
  for (let i = 0; i < columnsLength; i++) {
    const operator = operations[i]

    const newValues: string[] = []
    // let runningTotal = mathLines[0][i]
    // // skip first line
    for (let line = 0; line < mathLines.length; line++) {
      const currentNumber = mathLines[line][i]
      for (let internalColumn = 0; internalColumn < currentNumber.length; internalColumn++) {
        newValues[internalColumn] = `${newValues[internalColumn] ? newValues[internalColumn]: ""}${currentNumber[internalColumn]}`
      }
    }

    console.log({ newValues })
    let runningTotal = 0
    for (const string of newValues) {
      const currentNumber = Number(string)
      if (runningTotal === 0) {
        runningTotal = currentNumber
        continue
      }
      if (operator === "*") {
        runningTotal *= currentNumber
      } else if (operator === "+") {
        runningTotal += currentNumber
      }
    }
    console.log(runningTotal)
    overallTotal = overallTotal + runningTotal
  }

  return overallTotal;
};

// example answer = 3263827
const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
