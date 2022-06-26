import { TileData } from '../domain/TileData';
import { useEffect, useState } from 'react';
import { createBoard } from '../utils/createBoard';

interface IUseGame {
  tiles: TileData[];
}

export const useGame = (): IUseGame => {
  const [tiles, setTiles] = useState<TileData[]>([]);

  useEffect(() => {
    setTiles(createBoard());
  }, []);

  return {
    tiles,
  };
};
