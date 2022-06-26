import { FC, PropsWithChildren } from 'react';

export const GameTile: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="m-auto my-auto mx-auto text-center outline-dashed outline-1 outline-amber-500 bg-red-400"
      style={{
        width: 44,
        height: 44,
      }}
    >
      {children}
    </div>
  );
};
