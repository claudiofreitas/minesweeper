export const convertToIndex = (
  x: number,
  y: number,
  boardWidth: number
): number => {
  return x + boardWidth * y;
};
