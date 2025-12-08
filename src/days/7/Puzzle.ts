import { inputToArrayLines } from "../../utils/inputToArray.ts";

const getSplitterLocations = (currentLine: string) => {
  const splitters: number[] = []
  // look for index of splitters
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
  
  return splitters
}

const first = (input: string) => {
  const data = inputToArrayLines(input)

  const startBeam = data[0].indexOf("S") 
  let currentBeams: number[] = [startBeam]
  let countOfSplits = 0

  // look two lines down, if beam hits a splitter, beam continues at index - 1 and index + 1
  for (let i = 2; i < data.length; i += 2) {
    const currentLine = data[i]
    const splitters = getSplitterLocations(currentLine)

    // compare: did beam hit the splitter
    // if yes, increase countOfSplits, replace hit beam with index - 1, index + 1
    splitters.forEach((splitterIndex) => {
      const matchIndex = currentBeams.indexOf(splitterIndex)

      if (matchIndex !== -1) {
        countOfSplits++

        currentBeams.splice(matchIndex, 1, splitterIndex -1, splitterIndex +1)
      }
    })
  }
  return countOfSplits;
};

// example answer = 21
const expectedFirstSolution = 1711;

const second = (input: string) => {
  const data = inputToArrayLines(input)

  const startBeam = data[0].indexOf("S") 
  let currentBeams: number[] = [startBeam]
  let countOfPaths = 1

  for (let i = 2; i < data.length; i += 2) {
    console.log(i)
    const splitters = getSplitterLocations(data[i])
  
    let newBeams: number[] = []

    // console.log("Line: ", i + 1, { splitters, currentBeams})
    
    currentBeams.forEach((beamLocation, i) => {
      const matchCheck = splitters.includes(beamLocation)

      if (matchCheck) {
        countOfPaths++

        newBeams.push(beamLocation - 1)
        newBeams.push(beamLocation + 1)
        newBeams.sort((a, b) => a - b)
      } else {
        newBeams.push(beamLocation)
      }
      // console.log({i, beamLocation, matchCheck})
    })

    currentBeams = newBeams
  }

  console.log({countOfPaths, currentBeams, length: currentBeams.length})

  return countOfPaths;
};

// example answer = 40
const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
