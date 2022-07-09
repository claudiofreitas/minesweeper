import { FC, PropsWithChildren } from 'react';

const GameField: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
      }}
    >
      {children}
    </div>
  );
};

export { GameField };
