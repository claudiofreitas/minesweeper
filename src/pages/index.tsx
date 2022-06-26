import type { NextPage } from 'next';
import { GameBoard } from '../components/GameBoard';
import { GameTile } from '../components/GameTile';
import { useGame } from '../hooks/useGame';
import { NumericDisplay } from '../components/NumericDisplay';
import { Button } from '../components/Button';
import { GameHeader } from '../components/GameHeader';
import { GameField } from '../components/GameField';

const Home: NextPage = () => {
  const { tiles } = useGame();

  return (
    <GameBoard>
      <GameHeader>
        <NumericDisplay data={7} />
        <Button>🥹</Button>
        <NumericDisplay data={360} />
      </GameHeader>
      <GameField>
        {tiles.map((tile) => (
          <Button key={tile.id}>
            <GameTile>{tile.hasBomb ? '💣' : ''}</GameTile>
          </Button>
        ))}
      </GameField>
    </GameBoard>
  );
};

export default Home;

// possible values for each tile:
// bomb: boolean,
// visible: bomb, number, 0 (empty), flag
