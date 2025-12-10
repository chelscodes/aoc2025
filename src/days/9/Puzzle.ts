import { inputToArrayLineThenComma } from '../../utils/inputToArray.ts';

const first = (input: string) => {
  const data = inputToArrayLineThenComma(input);

  const areas = getAreas(data);

  return areas[0].area;
};

// example answer = 50
const expectedFirstSolution = 4781546175;

const second = (input: string) => {
  const data = inputToArrayLineThenComma(input);
  const areas = getAreas(data);

  console.log('~~ getting outline...');
  const outline = createOutline(data);
  console.log('~~ getting filled tiles...');
  const allRedGreenTiles = fillInOutline(outline);

  console.log('~~ starting validation...');
  // check that the area is valid, if not, check next one
  let validArea: { tiles: number[]; area: number } | undefined; // can update to just return valid area
  for (let i = 0; i < areas.length; i++) {
    console.log('checking area number', i + 1, 'of', areas.length);
    const currentTiles = areas[i].tiles;
    // console.log({
    //   currentTiles,
    //   tile1: data[currentTiles[0]],
    //   tile2: data[currentTiles[1]],
    // });

    if (checkForLine(currentTiles)) {
      validArea = areas[i];
      break;
    }

    const isValid = checkForValidArea(
      data[currentTiles[0]],
      data[currentTiles[1]],
      allRedGreenTiles
    );
    if (isValid) {
      validArea = areas[i];
      break;
    }
  }

  // console.log({ allRedGreenTiles });

  return validArea?.area;
};

// example answer = 24
const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };

// ~~~~~ HELPERS ~~~~~~
const getAreas = (data: number[][]) => {
  const areas: { tiles: number[]; area: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const length = Math.abs(data[i][0] - data[j][0]) + 1;
      const width = Math.abs(data[i][1] - data[j][1]) + 1;

      areas.push({
        tiles: [i, j],
        area: length * width,
      });
    }
  }

  return areas.sort((a, b) => b.area - a.area);
};

const checkForLine = (tiles: number[]) => {
  return tiles[1] === tiles[0] + 1 || tiles[0] === tiles[1] - 1;
};

const checkForValidArea = (
  tile1: number[],
  tile2: number[],
  validTiles: number[][]
  // allTiles: number[][]
) => {
  // console.log({ tile1, tile2 });
  const widthStart = tile1[0] < tile2[0] ? tile1[0] : tile2[0];
  const widthEnd = tile1[0] > tile2[0] ? tile1[0] : tile2[0];
  const heightStart = tile1[1] < tile2[1] ? tile1[1] : tile2[1];
  const heightEnd = tile1[1] > tile2[1] ? tile1[1] : tile2[1];

  // go through from width, height start to width, height end and check that the point is in the red/green tiles array

  // from top to bottom
  for (let i = heightStart; i <= heightEnd; i++) {
    for (let j = widthStart; j <= widthEnd; j++) {
      const found = validTiles.find((item) => item[0] === j && item[1] === i);
      if (!found) {
        return false;
      }
    }
  }

  return true;
};

const createOutline = (tileLocations: number[][]) => {
  const outlineTiles: number[][] = [];

  for (let i = 0; i < tileLocations.length; i++) {
    if (i === tileLocations.length - 1) {
      if (tileLocations[i][0] === tileLocations[0][0]) {
        // x matches, so fill y
        outlineTiles.push(...fillYValues(tileLocations[i], tileLocations[0]));
      }
      if (tileLocations[i][1] === tileLocations[0][1]) {
        // y matches, so fill x
        outlineTiles.push(...fillXValues(tileLocations[i], tileLocations[0]));
      }
      continue;
    }

    if (tileLocations[i][0] === tileLocations[i + 1][0]) {
      // x matches, so fill y
      outlineTiles.push(...fillYValues(tileLocations[i], tileLocations[i + 1]));
    }
    if (tileLocations[i][1] === tileLocations[i + 1][1]) {
      // y matches, so fill x
      outlineTiles.push(...fillXValues(tileLocations[i], tileLocations[i + 1]));
    }
  }

  return outlineTiles;
};

const fillInOutline = (outline: number[][]) => {
  // go top to bottom, (Y lowest to highest)
  // left to right fill X values (X lowest to highest)
  const sortedOutline = outline.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  console.log('~~ sorting done');

  // console.log('~~ creating the lines...');
  // const lineByLine: number[][][] = [];
  // while (sortedOutline.length > 0) {
  //   console.log({ sortedOutlineLength: sortedOutline.length });
  //   const start = sortedOutline[0];
  //   const last = sortedOutline.findLastIndex((item) => item[1] === start[1]);
  //   const line = sortedOutline.splice(0, last + 1);
  //   lineByLine.push(line);
  // }
  // console.log('~~ line by line created');

  console.log('~~ going through each line section...');
  const filledOutline: number[][] = [];
  let start = 1; // start of line index
  let end = sortedOutline.findLastIndex(
    (item) => item[1] === sortedOutline[start][1]
  ); // end of line index
  while (end < sortedOutline.length) {
    for (let i = start + 1; i <= end; i++) {
      // go through whole array
      console.log('~~ looking at line...', {
        start,
        end,
        length: sortedOutline.length,
      });
      // const currentLine = lineByLine[i];
      // let gapFound = false;

      if (sortedOutline[start - 1][0] === sortedOutline[i][0] - 1) {
        // next to each other
        filledOutline.push(sortedOutline[i - 1]);
        // continue; // x values are the same
      } else {
        // there's a gap, so go through entire gap length
        for (
          let gap = sortedOutline[start][0]; // start of gap, include first (outline)
          gap < sortedOutline[end][0];
          gap++
        ) {
          filledOutline.push([gap, sortedOutline[start][1]]);
        }
      }
      if (end === sortedOutline.length - 1) {
        end++;
        break;
      }
      start = end + 1;
      end = sortedOutline.findLastIndex(
        (item) => item[1] === sortedOutline[start][1]
      ); // skip next tile location because would be a gap
    }
  }

  return filledOutline;
};
//   console.log('~~ going through each line...', { length: lineByLine.length });
//   for (let i = 0; i < lineByLine.length; i++) {
//     console.log('~~ looking at line...', i);
//     const currentLine = lineByLine[i];
//     // let gapFound = false;
//     // if all consecutive, move on
//     for (let tileIndex = 1; tileIndex < currentLine.length; tileIndex++) {
//       if (currentLine[tileIndex - 1][0] === currentLine[tileIndex][0] - 1) {
//         continue;
//       }
//       for (
//         let gap = currentLine[tileIndex - 1][0] + 1;
//         gap < currentLine[tileIndex][0];
//         gap++
//       ) {
//         currentLine.push([gap, currentLine[tileIndex][1]]);
//       }
//       currentLine.sort((a, b) => a[0] - b[0]);
//       tileIndex += 2; // skip next tile location because would be a gap
//     }
//   }
//   return lineByLine.flat();
// };

// X values match [X, Y], so X is same for all
const fillYValues = (pointA: number[], pointB: number[]) => {
  const linePoints: number[][] = [];
  if (pointA[1] < pointB[1]) {
    for (let i = pointA[1] + 1; i <= pointB[1]; i++) {
      linePoints.push([pointA[0], i]);
    }
    return linePoints;
  }
  if (pointA[1] > pointB[1]) {
    for (let i = pointA[1] - 1; i >= pointB[1]; i--) {
      linePoints.push([pointA[0], i]);
    }
    return linePoints;
  }
  return [pointB]; // they're the same points
};

// Y values match [X, Y], so Y is same for all
const fillXValues = (pointA: number[], pointB: number[]) => {
  const linePoints: number[][] = [];
  if (pointA[0] < pointB[0]) {
    for (let i = pointA[0] + 1; i <= pointB[0]; i++) {
      linePoints.push([i, pointA[1]]);
    }
    return linePoints;
  }
  if (pointA[0] > pointB[0]) {
    for (let i = pointA[0] - 1; i >= pointB[0]; i--) {
      linePoints.push([i, pointA[1]]);
    }
    return linePoints;
  }
  return [pointB]; // they're the same points
};
