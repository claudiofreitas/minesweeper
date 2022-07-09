import { FC } from 'react';

interface Props {
  data: number;
}

const NumericDisplay: FC<Props> = ({ data }) => {
  const stringData = String(data)
    .padStart(3, '0')
    .split('')
    .map((character) => `${character}️⃣`)
    .join('');

  return <div>{stringData}</div>;
};

export { NumericDisplay };
