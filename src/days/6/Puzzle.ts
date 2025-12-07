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
  const data = inputToArrayLines(input)

  const operationsString = data.pop()
  if (operationsString === undefined) return "error in operations"
  const operations = operationsString?.trim().split(/[ ]+/) // only operation signs
  const numberOfColumns = operations.length

  const columnsWidths = operationsString.split(/[*|+]/) // string of spaces, skip first (blank), add 1 to last (missing gap)
  columnsWidths.shift() // remove first
  columnsWidths[columnsWidths.length - 1] = columnsWidths[columnsWidths.length - 1] + " "

  let overallTotal = 0

  // iterate through each line (long string), operations line already removed
  const mathLines = data.map((line, i) => {
    // placeholder for my new line, broken into array of strings
    const newLine = []

    // length of my full line so I know when to end
    const lineLength = line.length
    
    // length of the first value so I know where to chop, varies by column, skip first blank
    let valueLength = columnsWidths[0].length
    // running number for the column index to query the columnWidths with
    let columnIndex = 0

    // running start and end index for slice, endIndex is not included
    let startIndex = 0
    let endIndex = valueLength

    // go through the entire string, include full length because last is not included
    while (endIndex <= line.length) {
      // add my new line to the array
      newLine.push(line.slice(startIndex, endIndex))

      // console.log({ line, lineLength: line.length, startIndex, endIndex, valueLength, columnIndex, columnLength: columnsWidths[columnIndex].length, number: line[startIndex], newLine})
      // start where last left off and skip gap
      startIndex = endIndex + 1
      columnIndex++
      // console.log({columnIndex, columnLength: columnsWidths[columnIndex].length})
      valueLength = columnsWidths[columnIndex]?.length
      // adjust new end index based on new column width
      endIndex = startIndex + valueLength
      if (endIndex === lineLength - 1) {
        endIndex++
      }
    }
    return newLine
  })

  // console.log({mathLines})

  for (let i = 0; i < numberOfColumns; i++) {

    const operator = operations[i]

    const newValues: string[] = []
    // let runningTotal = mathLines[0][i]
    // build the new values to calculate
    for (let line = 0; line < mathLines.length; line++) {
      // console.log({ line, column: i, lineLength: mathLines[line].length })
      const currentNumber = mathLines[line][i]
      // console.log({currentNumber, previous: mathLines[line][i - 1]})
      // if (currentNumber === undefined) {
      //   continue
      // }
      for (let internalColumn = 0; internalColumn < currentNumber.length; internalColumn++) {
        newValues[internalColumn] = `${newValues[internalColumn] ? newValues[internalColumn]: ""}${currentNumber[internalColumn]}`
      }
    }

    // console.log({ newValues })
    let runningTotal = 0
    for (const string of newValues) {
      if (!string) {
        console.log("empty string")
      }
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
    overallTotal = overallTotal + runningTotal
  }

  return overallTotal;
};

// example answer = 3263827
const expectedSecondSolution = 9194682052782;

export { expectedFirstSolution, expectedSecondSolution, first, second };
