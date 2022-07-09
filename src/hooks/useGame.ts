import { TileData } from '../domain/TileData';
import { useCallback, useState } from 'react';
import { createBoard } from '../utils/createBoard';
import { useTimer } from './useTimer';
import { convertToXY } from '../math/convertToXY';
import { convertToIndex } from '../math/convertToIndex';

interface IUseGame {
  tiles: TileData[];
  resetGame: () => void;
  remainingBombs: number;
  elapsedSeconds: number;
  openTile: (index: number) => void;
  toggleFlag: (index: number) => void;
}

interface GameOptions {
  initialBombs: number;
  boardWidthInTiles: number;
  boardHeightInTiles: number;
}

const defaultOptions: GameOptions = {
  initialBombs: 10,
  boardWidthInTiles: 9,
  boardHeightInTiles: 9,
};

export const useGame = (options?: Partial<GameOptions>): IUseGame => {
  const { initialBombs, boardWidthInTiles, boardHeightInTiles } = {
    ...defaultOptions,
    ...options,
  };

  const [tiles, setTiles] = useState<TileData[]>([]);
  const { reset: resetTimer, units: elapsedSeconds } = useTimer({
    isRunning: true,
  });

  const resetBoard = useCallback(() => {
    let newBoard = createBoard({
      bombCount: initialBombs,
      widthInTiles: boardWidthInTiles,
      heightInTiles: boardHeightInTiles,
    });
    setTiles(newBoard);
  }, [boardHeightInTiles, boardWidthInTiles, initialBombs]);

  const resetGame = useCallback(() => {
    resetBoard();
    resetTimer();
  }, [resetBoard, resetTimer]);

  const openTile = (tileIndex: number): void => {
    const newTiles = tiles.slice();

    const tile = newTiles[tileIndex];
    if (!tile) return;

    if (['covered', 'questioned'].includes(tile.state)) {
      if (tile.type === 'bomb') {
        tile.state = 'exploded';
      } else {
        tile.state = 'discovered';
        if (tile.bombsAround === 0) {
          const { x, y } = convertToXY(tileIndex, boardWidthInTiles);
          for (let deltaX = -1; deltaX <= 1; deltaX++) {
            for (let deltaY = -1; deltaY <= 1; deltaY++) {
              const neighborX = x + deltaX;
              const neighborY = y + deltaY;
              const isNeighborXInsideRange =
                0 <= neighborX && neighborX < boardWidthInTiles;

              const isNeighborYInsideRange =
                0 <= neighborY && neighborY < boardWidthInTiles;

              if (isNeighborXInsideRange && isNeighborYInsideRange) {
                const neighborIndex = convertToIndex(
                  neighborX,
                  neighborY,
                  boardWidthInTiles
                );
                openTile(neighborIndex);
              }
            }
          }
        }
      }
    }

    setTiles(newTiles);
  };

  const toggleFlag = (tileIndex: number): void => {
    const newTiles = tiles.slice();

    const tile = newTiles[tileIndex];
    if (!tile) return;

    if (tile.state === 'covered') {
      // flag
      tile.state = 'flagged';
      setTiles(newTiles);
    } else if (tile.state === 'flagged') {
      // question
      tile.state = 'questioned';
      setTiles(newTiles);
    } else if (tile.state === 'questioned') {
      // unflag
      tile.state = 'covered';
      setTiles(newTiles);
    } else if (tile.state === 'discovered') {
      // do nothing
    } else if (tile.state === 'exploded') {
      // do nothing
    }
  };

  return {
    tiles,
    resetGame,
    remainingBombs: initialBombs,
    elapsedSeconds,
    openTile,
    toggleFlag,
  };
};
