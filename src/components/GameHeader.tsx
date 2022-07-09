import { FC, PropsWithChildren } from 'react';

const GameHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="flex flex-row items-center justify-between px-3"
      style={{
        backgroundColor: '#1A1A1C',
      }}
    >
      {children}
    </div>
  );
};

export { GameHeader };
