import type { NextPage } from 'next';
import { GameBoard } from '../components/GameBoard';
import { GameTile } from '../components/GameTile';
import { GameStatus, PresetGameOptions, useGame } from '../hooks/useGame';
import { NumericDisplay } from '../components/NumericDisplay';
import { Button } from '../components/Button';
import { GameHeader } from '../components/GameHeader';
import { GameField } from '../components/GameField';
import { useEffect } from 'react';

const useEffectOnce = (callback: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};

const Home: NextPage = () => {
  const {
    tiles,
    resetGame,
    remainingBombs,
    elapsedSeconds,
    openTile,
    toggleFlag,
    width,
    status,
  } = useGame(PresetGameOptions.EASY);

  useEffectOnce(() => {
    resetGame();
  });

  const handleClick = (index: number): void => {
    openTile(index);
  };

  const handleRightClick = (index: number): void => {
    toggleFlag(index);
  };

  const resetButtonLabel = (status: GameStatus): string => {
    return {
      [GameStatus.IN_PROGRESS]: '🥹',
      [GameStatus.WON]: '🥳',
      [GameStatus.LOST]: '🤯',
    }[status];
  };

  return (
    <div>
      <GameBoard>
        <GameHeader>
          <div className="flex flex-row gap-1">
            <NumericDisplay data={remainingBombs} />
            💣
          </div>
          <Button onClick={() => resetGame()}>
            {resetButtonLabel(status)}
          </Button>
          <div className="flex flex-row gap-1">
            🕰
            <NumericDisplay data={elapsedSeconds} />
          </div>
        </GameHeader>
        <GameField width={width}>
          {tiles.map((tile, index) => (
            <Button
              key={index}
              onClick={() => handleClick(index)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleRightClick(index);
              }}
            >
              <GameTile data={tile} />
            </Button>
          ))}
        </GameField>
      </GameBoard>
    </div>
  );
};

export default Home;
