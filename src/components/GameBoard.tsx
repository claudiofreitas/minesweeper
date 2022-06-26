import { FC, PropsWithChildren } from 'react';

export const GameBoard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid grid-cols-10 mx-auto my-0 bg-blue-300 w-max">
      {children}
    </div>
  );
};
