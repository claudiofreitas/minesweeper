import type { NextPage } from 'next';
import { GameBoard } from '../components/GameBoard';
import { GameTile } from '../components/GameTile';
import { useGame } from '../hooks/useGame';
import { NumericDisplay } from '../components/NumericDisplay';
import { Button } from '../components/Button';
import { GameHeader } from '../components/GameHeader';
import { GameField } from '../components/GameField';
import { useEffect } from 'react';
import { TileData } from '../domain/TileData';

const useEffectOnce = (callback: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};

const tileDisplayFromData = (tile: TileData): string => {
  if (tile.type === 'bomb') {
    return '💣';
  } else {
    return tile.bombsAround ? String(tile.bombsAround) : '';
  }
};

const Home: NextPage = () => {
  const { tiles, resetGame, remainingBombs, elapsedSeconds } = useGame({
    initialBombs: 9,
  });

  useEffectOnce(() => {
    resetGame();
  });

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
          <NumericDisplay data={elapsedSeconds} />
        </div>
      </GameHeader>
      <GameField>
        {tiles.map((tile, index) => (
          <Button key={index}>
            <GameTile>{tileDisplayFromData(tile)}</GameTile>
          </Button>
        ))}
      </GameField>
    </GameBoard>
  );
};

export default Home;
