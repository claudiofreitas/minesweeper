import { FC, PropsWithChildren } from 'react';

export const Button: FC<PropsWithChildren> = ({ children }) => {
  return (
    <button
      style={{
        minWidth: 44,
        minHeight: 44,
      }}
    >
      {children}
    </button>
  );
};
