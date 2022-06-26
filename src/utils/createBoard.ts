import { shuffle } from './shuffle';
import { TileData } from '../domain/TileData';

interface BoardOption {
  width?: number;
  height?: number;
  bombs?: number;
}

export const createBoard = ({
  width = 9,
  height = 9,
  bombs = 10,
}: BoardOption = {}): TileData[] => {
  let bombDistribution: boolean[] = [];

  for (let i = 0; i < width * height; i++) {
    const hasBomb = i < bombs;
    bombDistribution.push(hasBomb);
  }
  bombDistribution = shuffle(bombDistribution);

  const _board = [];
  for (let y = 0; y <= height; y += 1) {
    for (let x = 0; x <= width; x += 1) {
      const tile: TileData = {
        id: `${x}|${y}`,
        x,
        y,
        hasBomb: bombDistribution[x + y * width],
        bombsAround: 0,
        isFlagged: false,
      };
      _board.push(tile);
    }
  }
  return _board;
};
