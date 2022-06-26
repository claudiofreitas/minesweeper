import { ComponentProps, FC } from 'react';

type Props = ComponentProps<'button'>;

export const Button: FC<Props> = ({ children, ...otherProps }) => {
  return (
    <button
      style={{
        minWidth: 44,
        minHeight: 44,
      }}
      {...otherProps}
    >
      {children}
    </button>
  );
};
