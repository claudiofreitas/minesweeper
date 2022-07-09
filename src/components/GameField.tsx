import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  width: number;
};

const GameField: FC<Props> = ({ children, width }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${width}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
};

export { GameField };
