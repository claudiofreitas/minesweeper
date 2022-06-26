function randomUpTo(n: number) {
  return Math.floor(Math.random() * n);
}

export function shuffle<T>(array: T[]): T[] {
  const arrayCopy = array.slice();
  for (
    let movingIndex = arrayCopy.length - 1;
    movingIndex >= 0;
    movingIndex--
  ) {
    const switchingIndex = randomUpTo(movingIndex - 1);
    [arrayCopy[movingIndex], arrayCopy[switchingIndex]] = [
      arrayCopy[switchingIndex],
      arrayCopy[movingIndex],
    ];
  }
  return arrayCopy;
}

// Example:
// shuffle([1, 2, 3, 4])
// might return [2, 4, 1, 3] (or something)
