import { FC, PropsWithChildren } from 'react';

const GameBoard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="flex flex-col mx-auto w-max p-3 gap-3"
      style={{ backgroundColor: '#111213', width: '90%', maxWidth: '400px' }}
    >
      {children}
    </div>
  );
};

export { GameBoard };
