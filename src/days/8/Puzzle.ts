import {
  inputToArrayCommas,
  inputToArrayLines,
} from '../../utils/inputToArray.ts';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const first = (input: string, test = false) => {
  const data = formatData(input);
  // console.log(data);

  const distances = getDistances(data);
  const smallestNumbers = distances.slice(0, test ? 10 : 1000); // for test (0, 10) | for input (0, 1000)

  const circuits = distancesToCircuits(smallestNumbers);

  const filteredCircuits = getMergedCircuits(circuits);

  // ~~ multiple the largest 3 circuits
  let total = 0;
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      total = filteredCircuits[i].length;
      continue;
    }
    total *= filteredCircuits[i].length;
  }
  console.log({
    distancesLength: distances.length,
    filteredLength: filteredCircuits[0].length,
  });

  return total;
};

// ~~example answer = 40
// ~~6409 is too low (was unsorted)
const expectedFirstSolution = 123930;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const second = (input: string, test = false) => {
  const data = formatData(input);
  const startLength = test ? 10 : 1000;
  const distances = getDistances(data);

  const smallestNumbers = distances.slice(0, startLength); // start with a piece

  const circuits = distancesToCircuits(smallestNumbers);

  let filteredCircuits = getMergedCircuits(circuits);

  // console.log({ filteredCircuits, length: filteredCircuits[0].length });
  let countOfConnections = startLength; // count we're starting with

  while (
    filteredCircuits.length > 2 ||
    filteredCircuits[0].length < data.length
  ) {
    const newCircuitToAdd = distancesToCircuits([
      distances[countOfConnections],
    ]);
    filteredCircuits = getMergedCircuits([
      ...filteredCircuits,
      ...newCircuitToAdd,
    ]);

    countOfConnections++;
  }

  const finalConnection = distances[countOfConnections - 1];
  const pointA = data[finalConnection.pointA];
  const pointB = data[finalConnection.pointB];

  const finalAnswer = pointA[0] * pointB[0];

  console.log('distance object', distances[countOfConnections], {
    distancesLength: distances.length,
    filteredLength: filteredCircuits[0].length,
    countOfConnections,
    finalConnection,
    pointA,
    pointB,
  });
  return finalAnswer;
};

// example answer = 25272
const expectedSecondSolution = 27338688;

// ~~~~~ HELPERS ~~~~~~~~~~~
const formatData = (input: string) => {
  const data = inputToArrayLines(input);
  const formattedData = data.map((line) => {
    const array = inputToArrayCommas(line);
    return array.map((value) => Number(value));
  });
  return formattedData;
};

// ~~for 3D points, xyz
const straightLineDistance = (p: number[], q: number[]) => {
  // return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2])
  return Math.sqrt(
    (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2
  );
};

const getDistances = (data: number[][]) => {
  // ~~go through each point, find distance with points after,
  const distances: { pointA: number; pointB: number; distance: number }[] = [];
  // ~~go through each line
  for (let i = 0; i < data.length; i++) {
    // ~~go through each line after current)
    for (let j = i + 1; j < data.length; j++) {
      distances.push({
        pointA: i,
        pointB: j,
        distance: straightLineDistance(data[i], data[j]),
      });
    }
  }
  return distances.sort((a, b) => a.distance - b.distance);
};

// ~~compares numbers in second to first array
const searchForMatch = (first: number[], second: number[]) => {
  let matchFound = false;
  for (let j = 0; j < second.length; j++) {
    if (first.includes(second[j])) {
      matchFound = true;
      break;
    }
  }
  return matchFound;
};

const mergeCircuits = (circuits: number[][]) => {
  const mergedCircuits: number[][] = structuredClone(circuits);
  let mergeCount = 0;
  const matchedIndexes = [];

  // ~~start at second item
  for (let i = 1; i < circuits.length; i++) {
    // ~~if already merged, end and we'll restart
    if (mergeCount > 0) {
      break;
    }
    // ~~go through each previous item to check for a match
    for (let j = 0; j < i; j++) {
      const matchFound = searchForMatch(circuits[i], circuits[j]);
      if (matchFound) {
        mergeCount++;
        matchedIndexes[0] = [];
        const removedItem = mergedCircuits.splice(i, 1);
        mergedCircuits[j] = [...mergedCircuits[j], ...removedItem[0]];
        // console.log({
        //   circuits,
        //   mergedCircuits,
        //   removedItem,
        //   secondItem: circuits[i],
        //   compared: circuits[j],
        // });
        break;
      }
    }
  }
  return { mergedCircuits, mergeCount };
};

const distancesToCircuits = (
  distances: { pointA: number; pointB: number; distance: number }[]
) => {
  return distances.map((item) => {
    return [item.pointA, item.pointB];
  });
};

const getMergedCircuits = (circuits: number[][]) => {
  let lastMergeCount: number | undefined;
  let updatedCircuits = circuits;
  while (lastMergeCount !== 0) {
    const { mergedCircuits, mergeCount } = mergeCircuits(updatedCircuits);
    // console.log({ mergeCount, mergedCircuits });
    lastMergeCount = mergeCount;
    if (lastMergeCount > 0) {
      updatedCircuits = mergedCircuits;
    }
  }

  return updatedCircuits
    .map((item) => {
      const s = new Set(item);
      return [...s];
    })
    .sort((a, b) => b.length - a.length);
};

export { expectedFirstSolution, expectedSecondSolution, first, second };
