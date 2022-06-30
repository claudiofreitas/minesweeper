import { shuffle } from './shuffle';
import { TileData } from '../domain/TileData';

interface BoardOption {
  widthInTiles: number;
  heightInTiles: number;
  bombCount: number;
}

export const createBoard = ({
  widthInTiles,
  heightInTiles,
  bombCount,
}: BoardOption): TileData[] => {
  let bombDistribution: boolean[] = [];

  for (let i = 0; i < widthInTiles * heightInTiles; i++) {
    const hasBomb = i < bombCount;
    bombDistribution.push(hasBomb);
  }
  bombDistribution = shuffle(bombDistribution);

  const _board = [];
  for (let y = 0; y <= heightInTiles; y += 1) {
    for (let x = 0; x <= widthInTiles; x += 1) {
      const tile: TileData = {
        x,
        y,
        type: bombDistribution[x + y * widthInTiles] ? 'bomb' : 'land',
        state: 'covered',
        bombsAround: 0,
      };
      _board.push(tile);
    }
  }
  return _board;
};
