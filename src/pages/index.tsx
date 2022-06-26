import type { NextPage } from 'next';
import { GameBoard } from '../components/GameBoard';
import { GameTile } from '../components/GameTile';
import { useGame } from '../hooks/useGame';
import { NumericDisplay } from '../components/NumericDisplay';
import { Button } from '../components/Button';
import { GameHeader } from '../components/GameHeader';
import { GameField } from '../components/GameField';

const Home: NextPage = () => {
  const { tiles, resetGame, remainingBombs, timeInSeconds } = useGame();

  return (
    <GameBoard>
      <GameHeader>
        <div className="flex flex-row">
          <NumericDisplay data={remainingBombs} />
          💣
        </div>
        <Button onClick={() => resetGame()}>🥹</Button>
        <div className="flex flex-row">
          🕰
          <NumericDisplay data={timeInSeconds} />
        </div>
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
