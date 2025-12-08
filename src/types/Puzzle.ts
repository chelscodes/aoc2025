type Puzzle = {
  first: (input: string, test?: boolean) => string;
  expectedFirstSolution: string;
  second: (input: string, test?: boolean) => string;
  expectedSecondSolution: string;
};

export type { Puzzle };
