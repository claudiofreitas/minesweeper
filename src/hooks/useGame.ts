import { TileData } from '../domain/TileData';
import { useCallback, useState } from 'react';
import { createBoard } from '../utils/createBoard';
import { useTimer } from './useTimer';

interface IUseGame {
  tiles: TileData[];
  resetGame: () => void;
  remainingBombs: number;
  elapsedSeconds: number;
}

export const useGame = (): IUseGame => {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const { reset: resetTimer, units: elapsedSeconds } = useTimer({
    isRunning: true,
  });

  const resetGame = useCallback(() => {
    console.log('resetGame()');
    resetBoard();
    resetTimer();
  }, [resetTimer]);

  const resetBoard = () => {
    setTiles(() => createBoard());
  };

  return {
    tiles,
    resetGame,
    remainingBombs: 10,
    elapsedSeconds,
  };
};
