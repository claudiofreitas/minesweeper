const convertToXY = (
  index: number,
  boardWidth: number
): { x: number; y: number } => {
  const y = Math.floor(index / boardWidth);
  const x = index % boardWidth;
  return { x, y };
};

export { convertToXY };
