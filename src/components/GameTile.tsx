import { FC, PropsWithChildren } from 'react';

export const GameTile: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="flex items-center justify-center m-auto my-auto mx-auto outline-dashed outline-1 outline-amber-900 bg-stone-800"
      style={{
        width: 44,
        height: 44,
      }}
    >
      {children}
    </div>
  );
};
