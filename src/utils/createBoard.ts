import { shuffle } from './shuffle';
import { TileData } from '../domain/TileData';

export const convertToIndex = (
  x: number,
  y: number,
  boardWidth: number
): number => {
  return x + boardWidth * y;
};

export const convertToXY = (
  index: number,
  boardWidth: number
): { x: number; y: number } => {
  const y = Math.floor(index / boardWidth);
  const x = index % boardWidth;
  return { x, y };
};

const getTile = (
  x: number,
  y: number,
  board: TileData[],
  boardWidth: number
): TileData | undefined => {
  return board[convertToIndex(x, y, boardWidth)];
};

const calculateBombsAround = (
  board: TileData[],
  widthInTiles: number
): number[] => {
  const heightInTiles = board.length / widthInTiles;

  const bombsAround = [];

  for (let i = 0; i < board.length; i += 1) {
    const { x, y } = convertToXY(i, widthInTiles);
    const neighbors = [];
    for (let deltaX = -1; deltaX <= 1; deltaX++) {
      for (let deltaY = -1; deltaY <= 1; deltaY++) {
        const neighborX = x + deltaX;
        const neighborY = y + deltaY;

        const isNeighborXInsideRange =
          0 <= neighborX && neighborX < widthInTiles;

        const isNeighborYInsideRange =
          0 <= neighborY && neighborY < heightInTiles;

        if (isNeighborXInsideRange && isNeighborYInsideRange) {
          const neighbor = getTile(neighborX, neighborY, board, widthInTiles);
          neighbors.push(neighbor);
        }
      }
    }

    let sum = 0;
    for (let neighbor of neighbors) {
      if (neighbor!.type === 'bomb') {
        sum += 1;
      }
    }
    bombsAround.push(sum);
  }
  return bombsAround;
};

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
  console.log('widthInTiles', widthInTiles);
  console.log('heightInTiles', heightInTiles);

  // Generate bomb distribution
  let bombDistribution: boolean[] = [];
  for (let i = 0; i < widthInTiles * heightInTiles; i++) {
    const hasBomb = i < bombCount;
    bombDistribution.push(hasBomb);
  }
  bombDistribution = shuffle(bombDistribution);

  // Generate initial board
  const board: TileData[] = [];
  for (let y = 0; y < heightInTiles; y += 1) {
    for (let x = 0; x < widthInTiles; x += 1) {
      const tile: TileData = {
        x,
        y,
        type: bombDistribution[x + y * widthInTiles] ? 'bomb' : 'land',
        state: 'covered',
        bombsAround: 0,
      };
      board.push(tile);
    }
  }

  const bombsAround = calculateBombsAround(board, widthInTiles);
  for (let i = 0; i < board.length; i++) {
    board[i].bombsAround = bombsAround[i];
  }

  return board;
};
