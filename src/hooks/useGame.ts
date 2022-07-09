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
  width: number;
  status: GameStatus;
}

interface GameOptions {
  initialBombs: number;
  boardWidthInTiles: number;
  boardHeightInTiles: number;
}

type PresetKeys = 'EASY' | 'MEDIUM' | 'HARD';
const PresetGameOptions: Record<PresetKeys, GameOptions> = {
  EASY: {
    boardWidthInTiles: 9,
    boardHeightInTiles: 9,
    initialBombs: 10,
  },
  MEDIUM: {
    boardWidthInTiles: 16,
    boardHeightInTiles: 16,
    initialBombs: 40,
  },
  HARD: {
    boardWidthInTiles: 16,
    boardHeightInTiles: 30,
    initialBombs: 99,
  },
};

enum GameStatus {
  IN_PROGRESS,
  LOST,
  WON,
}

const useGame = (options?: Partial<GameOptions>): IUseGame => {
  const defaultOptions = PresetGameOptions.EASY;

  const { initialBombs, boardWidthInTiles, boardHeightInTiles } = {
    ...defaultOptions,
    ...options,
  };

  const [tiles, setTiles] = useState<TileData[]>([]);
  const {
    reset: resetTimer,
    units: elapsedSeconds,
    stop: stopTimer,
    start: startTimer,
  } = useTimer({
    isRunning: true,
  });

  const [status, setStatus] = useState<GameStatus>(GameStatus.IN_PROGRESS);

  const resetBoard = useCallback(() => {
    let newBoard = createBoard({
      bombCount: initialBombs,
      widthInTiles: boardWidthInTiles,
      heightInTiles: boardHeightInTiles,
    });
    setTiles(newBoard);
  }, [boardHeightInTiles, boardWidthInTiles, initialBombs]);

  const resetGame = useCallback(() => {
    setStatus(GameStatus.IN_PROGRESS);
    resetBoard();
    resetTimer();
    startTimer();
  }, [resetBoard, resetTimer, startTimer]);

  const openTile = (tileIndex: number): void => {
    if (status !== GameStatus.IN_PROGRESS) return;
    const newTiles = tiles.slice();

    const tile = newTiles[tileIndex];
    if (!tile) return;

    if (['covered', 'questioned'].includes(tile.state)) {
      if (tile.type === 'bomb') {
        tile.state = 'exploded';
        setStatus(GameStatus.LOST);
        stopTimer();
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
    if (status !== GameStatus.IN_PROGRESS) return;
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

  const flagCount = tiles.filter((tile) => tile.state === 'flagged').length;

  const landTiles = tiles.filter((tile) => tile.type === 'land');
  const discoveredLandCount = landTiles.filter(
    (tile) => tile.state === 'discovered'
  ).length;
  const landCount = landTiles.length;
  const undiscoveredLandCount = landCount - discoveredLandCount;

  if (undiscoveredLandCount === 0) {
    if (status != GameStatus.WON) {
      setStatus(GameStatus.WON);
      stopTimer();
    }
  }

  return {
    tiles,
    resetGame,
    remainingBombs: initialBombs - flagCount,
    elapsedSeconds,
    openTile,
    toggleFlag,
    width: boardWidthInTiles,
    status,
  };
};

export { useGame, PresetGameOptions, GameStatus };
