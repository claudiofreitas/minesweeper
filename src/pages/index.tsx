import type { NextPage } from 'next';
import { GameBoard } from '../components/GameBoard';
import { GameTile } from '../components/GameTile';
import { useGame } from '../hooks/useGame';
import { FC, PropsWithChildren } from 'react';
import { NumericDisplay } from '../components/NumericDisplay';

const GameHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-row bg-red-400">{children}</div>;
};

const GameField: FC<PropsWithChildren> = ({ children }) => {
  return <div className="grid grid-cols-10">{children}</div>;
};

const ResetButton: FC<PropsWithChildren> = ({ children }) => {
  return <button className="">{children}</button>;
};

const Home: NextPage = () => {
  const { tiles } = useGame();

  return (
    <GameBoard>
      <GameHeader>
        <NumericDisplay data={7} />
        <ResetButton>🥹</ResetButton>
        <NumericDisplay data={360} />
      </GameHeader>
      <GameField>
        {tiles.map((tile, index) => (
          <GameTile key={index}>{tile.hasBomb ? '💣' : ''}</GameTile>
        ))}
      </GameField>
    </GameBoard>
  );
};

export default Home;

// possible values for each tile:
// bomb: boolean,
// visible: bomb, number, 0 (empty), flag
