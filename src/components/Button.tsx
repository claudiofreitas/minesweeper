import { ComponentProps, FC } from 'react';

type Props = ComponentProps<'button'>;

const Button: FC<Props> = ({ children, ...otherProps }) => {
  return <button {...otherProps}>{children}</button>;
};

export { Button };
