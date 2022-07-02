import { ComponentProps, FC } from 'react';

type Props = ComponentProps<'button'>;

export const Button: FC<Props> = ({ children, ...otherProps }) => {
  return <button {...otherProps}>{children}</button>;
};
