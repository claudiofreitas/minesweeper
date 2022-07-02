import { FC, PropsWithChildren } from 'react';

export const GameField: FC<PropsWithChildren> = ({ children }) => {
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
