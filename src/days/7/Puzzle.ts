import { inputToArrayLines } from "../../utils/inputToArray.ts";

const first = (input: string) => {
  const data = inputToArrayLines(input)

  const startBeam = data[0].indexOf("S") 
  let currentBeams: number[] = [startBeam]
  let countOfSplits = 0
  // look two lines down, if beam hits a splitter, beam continues at index - 1 and index + 1
  for (let i = 2; i < data.length; i += 2) {
    const currentLine = data[i]
    const splitters: number[] = []

    // look for index of splitters
    // const index = currentLine.indexOf("^")
    let found = true
    let lastSplitterIndex = 0
    while (found) {
      const splitterIndex = currentLine.indexOf("^", lastSplitterIndex)

      if (splitterIndex !== -1) {
        splitters.push(splitterIndex)
        lastSplitterIndex = splitterIndex + 1
      } else {
        found = false
      }
    }

    // compare: did beam hit the splitter
    // if yes, increase countOfSplits, replace hit beam with index - 1, index + 1
    splitters.forEach((splitterIndex) => {
      const matchIndex = currentBeams.indexOf(splitterIndex)

      if (matchIndex !== -1) {
        countOfSplits++

        currentBeams.splice(matchIndex, 1, splitterIndex -1, splitterIndex +1)
      }
    })

    // remove duplicate beam indices
    const filteredBeams = currentBeams.filter((item, index, array) => item !== array[index + 1]);
    currentBeams = filteredBeams
  }

  return countOfSplits;
};

// example answer = 21
const expectedFirstSolution = 1711;

const second = (input: string) => {
  console.log("Running second function...")
  const data = inputToArrayLines(input)

  const startBeam = data[0].indexOf("S") 
  let currentBeams: number[] = new Array(data[0].length)
  currentBeams.fill(0)
  currentBeams[startBeam] = 1
  
  let nextBeamLine: number[] = structuredClone(currentBeams)

  for (let i = 2; i < data.length; i += 2) {
    for (let j = 0; j < currentBeams.length; j++){
      const amountOfBeamsHere = currentBeams[j]
      const matchCheck = data[i][j] === "^" && amountOfBeamsHere > 0

      if (matchCheck) {
        nextBeamLine[j - 1] += amountOfBeamsHere
        nextBeamLine[j] -= amountOfBeamsHere
        nextBeamLine[j + 1] += amountOfBeamsHere
      } 
    }
    currentBeams = nextBeamLine
  }

  const countOfPaths = currentBeams.reduce((previousValue, currentValue) => previousValue + currentValue)
  
  console.log("DONE!!", {countOfPaths, currentBeamLength: currentBeams.length})
  return countOfPaths;
};

// example answer = 40
const expectedSecondSolution = 36706966158365;

export { expectedFirstSolution, expectedSecondSolution, first, second };
