export const inputToArrayLines = (input: string) => {
  return input.split(/\r?\n/);
};

export const inputToArrayLineSections = (input: string) => {
  const firstSplit = input.split(/\r?\n\n/)
  const multipleArrays = firstSplit.map((string) => {
    return inputToArrayLines(string)
  })
  return multipleArrays
}

export const inputToArrayCommas = (input: string) => {
  return input.split(",");
};
