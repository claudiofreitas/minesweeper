import { TileData } from '../domain/TileData';
import { useCallback, useEffect, useState } from 'react';
import { createBoard } from '../utils/createBoard';
import { useTimer } from './useTimer';

interface IUseGame {
  tiles: TileData[];
  resetGame: () => void;
  remainingBombs: number;
  timeInSeconds: number;
}

export const useGame = (): IUseGame => {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const { reset: resetTimer } = useTimer();

  const resetGame = useCallback(() => {
    console.log('resetGame()');
    resetBoard();
    resetTimer();
  }, [resetTimer]);

  const resetBoard = () => {
    setTiles(() => createBoard());
  };

  // useEffect(() => {
  //   resetGame();
  // }, [resetGame]);

  return {
    tiles,
    resetGame,
    remainingBombs: 10,
    timeInSeconds: 99,
  };
};
