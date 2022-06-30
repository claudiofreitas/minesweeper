import { FC, PropsWithChildren } from 'react';

export const GameField: FC<PropsWithChildren> = ({ children }) => {
  return <div className="grid grid-cols-9">{children}</div>;
};
