import { TileData } from '../domain/TileData';
import { useCallback, useState } from 'react';
import { createBoard } from '../utils/createBoard';
import { useTimer } from './useTimer';

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
    console.log('resetGame()');
    resetBoard();
    resetTimer();
  }, [resetBoard, resetTimer]);

  const openTile = (tileIndex: number): void => {
    console.log(`openTile(${tileIndex})`);

    const newTiles = tiles.slice();

    const tile = newTiles[tileIndex];
    if (!tile) return;

    if (tile.type === 'bomb') {
      if (tile.state === 'covered') {
        // explode
        tile.state = 'exploded';
        setTiles(newTiles);
      } else if (tile.state === 'flagged') {
        // do nothing
      } else if (tile.state === 'questioned') {
        // explode
        tile.state = 'exploded';
        setTiles(newTiles);
      } else if (tile.state === 'discovered') {
        // do nothing
      } else if (tile.state === 'exploded') {
        // do nothing
      }
    } else {
      if (tile.state === 'covered') {
        // discover
        tile.state = 'discovered';
        setTiles(newTiles);
      } else if (tile.state === 'flagged') {
        // do nothing
      } else if (tile.state === 'questioned') {
        // discover
        tile.state = 'discovered';
        setTiles(newTiles);
      } else if (tile.state === 'discovered') {
        // do nothing
      }
    }
  };

  const toggleFlag = (tileIndex: number): void => {
    console.log(`toggleFlag(${tileIndex})`);

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
