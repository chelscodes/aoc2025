Example of an improved solution based on my brain dump solution (which does work)

```typescript
import { inputToArrayCommas } from "../../utils/inputToArray.ts";

const first = (input: string) => {
  const data = inputToArrayCommas(input);
  let sum = 0;

  for (const range of data) {
    const [start, end] = range.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      const str = i.toString();
      const length = str.length;

      // Odd lengths will never be a match
      if (length % 2 !== 0) continue;

      // Check if first half equals second half
      const middle = length / 2;
      if (str.slice(0, middle) === str.slice(middle)) {
        sum += i;
      }
    }
  }

  return sum;
};

const expectedFirstSolution = "23701357374";

// Helper function to check if a string consists of a repeated pattern
const isRepeatedPattern = (str: string): boolean => {
  const length = str.length;

  // Try each possible pattern length that evenly divides the string length
  for (let patternLength = 1; patternLength <= length / 2; patternLength++) {
    if (length % patternLength !== 0) continue;

    const pattern = str.slice(0, patternLength);
    const repetitions = length / patternLength;

    // Check if repeating the pattern creates the full string
    if (pattern.repeat(repetitions) === str) {
      return true;
    }
  }

  return false;
};

const second = (input: string) => {
  const data = inputToArrayCommas(input);
  let sum = 0;

  for (const range of data) {
    const [start, end] = range.split("-").map(Number);

    for (let id = start; id <= end; id++) {
      const idString = id.toString();

      if (isRepeatedPattern(idString)) {
        sum += id;
      }
    }
  }

  return sum;
};

const expectedSecondSolution = "34284458938";

export { expectedFirstSolution, expectedSecondSolution, first, second };
```
