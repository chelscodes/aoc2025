import { inputToArrayLines } from "../../utils/inputToArray.ts";

const first = (input: string) => {
  const data = inputToArrayLines(input)

  const length = data.length // amount of lines to check
  // const width = data[0].length
  const startBeam = data[0].indexOf("S") 
  let currentBeams: number[] = [startBeam]
  let countOfSplits = 0
  // look two lines down, if beam hits a splitter, beam continues at index - 1 and index + 1
  for (let i = 2; i < length; i += 2) {
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

    // console.log({currentLine, splitters, currentBeams, filteredBeams, index})
  }

  // console.log({ width })
  return countOfSplits;
};

// example answer = 21
const expectedFirstSolution = 1711;

const second = (input: string) => {
  // console.log(input);
  return 'solution 2';
};

// example answer =
const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
