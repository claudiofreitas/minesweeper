import type { NextPage } from 'next';
import { GameBoard } from '../components/GameBoard';
import { GameTile } from '../components/GameTile';
import { useGame } from '../hooks/useGame';

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
