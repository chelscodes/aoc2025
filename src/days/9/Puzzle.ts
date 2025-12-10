import { inputToArrayLineThenComma } from '../../utils/inputToArray.ts';

const first = (input: string) => {
  const data = inputToArrayLineThenComma(input);

  const areas = getAreas(data);

  // console.log({ data, areas });
  return areas[0].area;
};

// example answer = 50
const expectedFirstSolution = 4781546175;

const second = (input: string) => {
  const data = inputToArrayLineThenComma(input);

  const areas = getAreas(data);

  createOutline(data);

  // check that the area is valid, if not, check next one
  let validArea: { tiles: number[]; area: number } | undefined; // can update to just return valid area
  for (let i = 0; i < areas.length; i++) {
    const currentTile = areas[i].tiles;

    if (checkForLine(currentTile)) {
      validArea = areas[i];
      break;
    }
  }

  console.log();

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

const createOutline = (tileLocations: number[][]) => {
  const outlineTiles: number[][] = [];

  for (let i = 0; i < tileLocations.length; i++) {
    if (tileLocations[i][0] === tileLocations[i + 1][0]) {
      // add
    }
    if (tileLocations[i][1] === tileLocations[i + 1][1]) {
    }
  }

  console.log({ outlineTiles });

  // for (let i = 0; i < tileLocations.length; i++) {

  // }
};
