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

  const outline = createOutline(data);
  const allRedGreenTiles = getFilledInRanges(outline);

  console.log('~~ starting validation...');

  // check that the area is valid, if not, check next one
  let validArea: { tiles: number[]; area: number } | undefined; // can update to just return valid area
  for (let i = 0; i < areas.length; i++) {
    console.log('checking area number', i + 1, 'of', areas.length);
    const currentTiles = areas[i].tiles;

    // if (checkForLine(currentTiles)) {
    //   validArea = areas[i];
    //   break;
    // }

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
// area number 121084 of 122760 -- answer 1017520 is too low
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

// const checkForLine = (tiles: number[]) => {
//   return tiles[1] === tiles[0] + 1 || tiles[0] === tiles[1] - 1;
// };

const checkForValidArea = (
  tile1: number[],
  tile2: number[],
  validTiles: Map<number, number[][]>
) => {
  const widthStart = tile1[0] < tile2[0] ? tile1[0] : tile2[0];
  const widthEnd = tile1[0] > tile2[0] ? tile1[0] : tile2[0];
  const heightStart = tile1[1] < tile2[1] ? tile1[1] : tile2[1];
  const heightEnd = tile1[1] > tile2[1] ? tile1[1] : tile2[1];

  // go through from width, height start to width, height end and check that the point is in the red/green tiles array

  // from top to bottom
  for (let i = heightStart; i <= heightEnd; i++) {
    // for (let j = widthStart; j <= widthEnd; j++) {
    const rangesForLine = validTiles.get(i);
    if (!rangesForLine) return false;
    // let found = false

    // find valid range
    const found = rangesForLine.filter((range) => {
      return range[0] <= widthStart && range[1] >= widthEnd;
    });
    if (!found.length) {
      // console.log({ i, rangesForLine, widthStart, widthEnd });
      return false;
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

const getFilledInRanges = (outline: number[][]) => {
  const sortedOutline = outline.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  console.log('~~ sorting done');

  console.log('~~ going through each line section...');
  const filledRangesMap: Map<number, number[][]> = new Map(); // line is key, value is array of ranges

  let start = 0; // start of line index
  let end = sortedOutline.findLastIndex(
    (item) => item[1] === sortedOutline[start][1]
  ); // end of line index
  while (end < sortedOutline.length) {
    console.log('SECTION', start, end, 'of', sortedOutline.length - 1);
    // go through each vertical line space, inclusive of end, skip first value
    for (let i = start + 1; i <= end; i++) {
      const lineIndex = sortedOutline[start][1]; // y value, same across this section

      // look at previous value and current value - 1, if same, they're consecutive
      // ALWAYS looking at [0] because [1] will always be the same for these sections
      if (sortedOutline[i - 1][0] === sortedOutline[i][0] - 1) {
        const lastAddedRange = filledRangesMap.get(lineIndex)?.pop();

        if (lastAddedRange && lastAddedRange[1] === sortedOutline[i][0] - 1) {
          filledRangesMap.set(lineIndex, [
            ...(filledRangesMap.get(lineIndex) ?? []),
            [lastAddedRange[0], sortedOutline[i][0]],
          ]);
        } else {
          filledRangesMap.set(lineIndex, [
            ...(filledRangesMap.get(lineIndex) ?? []),
            [sortedOutline[i - 1][0], sortedOutline[i][0]],
          ]);
        }
      } else {
        //  GOING TO NEED TO ADD LOGIC TO HANDLE CHECK THAT IT'S A TRUE GAP
        const lastAddedRange = filledRangesMap.get(lineIndex)?.pop();
        // there's a gap, so add gap range
        if (lastAddedRange) {
          filledRangesMap.set(lineIndex, [
            ...(filledRangesMap.get(lineIndex) ?? []),
            [lastAddedRange[0], sortedOutline[i][0]],
          ]);
        } else {
          filledRangesMap.set(lineIndex, [
            ...(filledRangesMap.get(lineIndex) ?? []),
            [sortedOutline[i - 1][0], sortedOutline[i][0]],
          ]);
        }
        i += 2;
      }
      if (end === sortedOutline.length) {
        end++;
        break;
      }
    }
    start = end + 1;
    if (sortedOutline[start]) {
      end = sortedOutline.findLastIndex(
        (item) => item[1] === sortedOutline[start][1]
      );
    } else {
      end = sortedOutline.length + 1;
    }
  }
  // console.log({ filledRangesMap });
  return filledRangesMap;
};

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
