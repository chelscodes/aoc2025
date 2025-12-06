import { inputToArrayLineSections } from "../../utils/inputToArray.ts";

const processData = (input: string) => {
  const data = inputToArrayLineSections(input)
  const ranges = data[0]
  const ids = data[1]
  // console.log({ ranges, ids });

  return { ranges, ids}
}

const first = (input: string) => {
  const {ranges, ids} = processData(input)
  let totalFresh = 0
  
  for (const id of ids) {
    for (const range of ranges) {
      const numberId = Number(id)
      // When refactoring, stop doing this multiple times
      const formatRange = range.split("-")
      const start = Number(formatRange[0])
      const end = Number(formatRange[1])

      if (numberId > end) {
        continue
      }
      if (numberId < start) {
        continue
      }
      totalFresh++
      break
    }
  }
  return totalFresh;
};

// example answer = 3
const expectedFirstSolution = 798;

const mergeRanges = (ranges: number[][]) => {
  const mergedRanges = []
  let mergeCount = 0
  let swallowed = false

  // go over each range
  for (let i = 0; i < ranges.length; i++) {
    const matchesPrevious = ranges[i - 1] && (ranges[i - 1][0] === ranges[i][0] && ranges[i - 1][1] === ranges[i][1])
    const matchNext = ranges[i + 1] && ranges[i][0] === ranges[i + 1][0] && ranges[i][1] === ranges[i + 1][1]

    // skip last item UNLESS previous item was skipped (swallowed) OR it doesn't match the previous item, then add last item
    if (i === ranges.length - 1) {
      if (!swallowed || !matchesPrevious) {
        console.log("is unique, so added last item")
        mergedRanges.push(ranges[i])
      }
      console.log("skipped last item")
      break
    }

    // if duplicate range, skip
    if (matchNext) {
      console.log("was a match to next one, so skipped")
      continue
    }

    // skip the swallowed item
    if (swallowed) {
      console.log("skipped because was swallowed by previous:", ranges[i])
      ranges[i] = [0, 0]
      swallowed = false
      continue
    }

    swallowed = false

    // the two ranges butt up against each other
    if (ranges[i][1] === ranges[i + 1][0]) {
      console.log("merged, butts up against next")
      mergedRanges.push([ranges[i][0], ranges[i + 1][1]])
      swallowed = true
      mergeCount++
      continue
    }

    // the first range ends past the end of the second range (swallows it)
    if (ranges[i][1] >= ranges[i + 1][1]) {
      console.log("merged, swallowed up")
      // deal with swallow
      swallowed = true
      mergedRanges.push(ranges[i])
      mergeCount++
      continue
    }

    // the first range ends in the middle of the second range
    if (ranges[i][1] > ranges[i + 1][0]) {
      // console.log("first overlaps with second", ranges[i], ranges[i + 1])
      // console.log("overlap", i)
      mergedRanges.push([ranges[i][0], ranges[i + 1][1]])
      mergeCount++
      
      continue
    }
      mergedRanges.push(ranges[i])
  }
  return {mergedRanges, mergeCount}
}

const second = (input: string) => {
  const { ranges } = processData(input)

  // Turn into nested array [[3 , 5], [10, 14]...]
  const numberRanges = ranges.map((range) => {
    const formatRange = range.split("-")
    const start = Number(formatRange[0])
    const end = Number(formatRange[1])
    return [start, end]
  })
  // console.log({ranges, numberRanges})
  
  // Sort by starting number in range
  numberRanges.sort((a, b) => {
    return a[0] - b[0]
  })

  console.log("Sorted:", {numberRanges})
  
  let lastMergeCount
  let updatedRanges = numberRanges
  let iterationCount = 0
  while (lastMergeCount !== 0) {
    const { mergedRanges, mergeCount } = mergeRanges(updatedRanges)
    lastMergeCount = mergeCount
    if (lastMergeCount > 0) {
      updatedRanges = mergedRanges
    }
    console.log({ mergeCount, mergedRanges })
    iterationCount++
  }

  let freshIdCount = 0
  updatedRanges.forEach((range) => {
    const lengthOfRange = range[1] - range[0] + 1
    freshIdCount = freshIdCount + lengthOfRange
  })

  console.log({iterationCount, updatedRanges})

  return freshIdCount;
};

// example answer = 14
const expectedSecondSolution = 366181852921027;

export { expectedFirstSolution, expectedSecondSolution, first, second };
