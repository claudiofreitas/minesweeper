import type { NextPage } from 'next';
import { GameBoard } from '../components/GameBoard';
import { GameTile } from '../components/GameTile';
import { shuffle } from '../utils/shuffle';
import { useEffect, useState } from 'react';
import { createBoard } from '../utils/createBoard';
import { TileData } from '../domain/TileData';

interface IUseGame {
  tiles: TileData[];
}

const useGame = (): IUseGame => {
  const [tiles, setTiles] = useState<TileData[]>([]);

  useEffect(() => {
    setTiles(createBoard());
  }, []);

  return {
    tiles,
  };
};

const Home: NextPage = () => {
  const { tiles } = useGame();

  return (
    <GameBoard>
      {tiles.map((tile, index) => (
        <GameTile key={index}>{tile.hasBomb ? '💣' : ''}</GameTile>
      ))}
    </GameBoard>
  );
};

export default Home;

// possible values for each tile:
// bomb: boolean,
// visible: bomb, number, 0 (empty), flag
