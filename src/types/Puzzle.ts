type Puzzle = {
  first: (input: string, test?: boolean) => string;
  expectedFirstSolution: string;
  second: (input: string) => string;
  expectedSecondSolution: string;
};

export type { Puzzle };
