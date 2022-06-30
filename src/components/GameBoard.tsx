import { FC, PropsWithChildren } from 'react';

export const GameBoard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col mx-auto bg-stone-900 w-max p-3 gap-3">
      {children}
    </div>
  );
};
