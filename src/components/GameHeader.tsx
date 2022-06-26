import { FC, PropsWithChildren } from 'react';

export const GameHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-row items-center justify-between bg-red-400">
      {children}
    </div>
  );
};
