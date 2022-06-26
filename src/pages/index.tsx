import type { NextPage } from 'next';
import { GameBoard } from '../components/GameBoard';
import { GameTile } from '../components/GameTile';
import { shuffle } from '../utils/shuffle';

interface TileData {
  hasBomb: boolean;
  isFlagged: boolean;
  bombsAround: number;
  x: number;
  y: number;
  id: string;
}

interface IUseGame {
  tiles: TileData[];
}

interface BoardOption {
  width?: number;
  height?: number;
  bombs?: number;
}

const useGame = (): IUseGame => {
  const createNewBoard = ({
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

  return {
    tiles: createNewBoard(),
  };
};

const Home: NextPage = () => {
  const { tiles } = useGame();

  return (
    <GameBoard>
      {tiles.map((tile, index) => (
        <GameTile key={index}>{tile.hasBomb ? '💣' : ''}</GameTile>
      ))}

      {/*<Tile>💣</Tile>*/}
      {/*<Tile>c</Tile>*/}
      {/*<Tile>c</Tile>*/}
    </GameBoard>
  );
};

export default Home;

// possible values for each tile:
// bomb: boolean,
// visible: bomb, number, 0 (empty), flag
