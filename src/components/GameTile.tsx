import { FC } from 'react';
import { TileData } from '../domain/TileData';

const tileDisplayFromData = (tile: TileData): string => {
  if (tile.type === 'bomb') {
    return '💣';
  } else {
    return tile.bombsAround ? String(tile.bombsAround) : '';
  }
};

type Props = {
  data: TileData;
};

const TileOverlay: FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(34,35,38,0.9)',
        // backgroundColor: 'rgb(25, 26, 28, 0.9)',
        // backdropFilter: 'blur(1px)',
      }}
    />
  );
};

export const GameTile: FC<Props> = ({ data }) => {
  const isCovered = data.state === 'covered';

  return (
    <div
      className="flex relative items-center justify-center m-auto my-auto mx-auto outline-dashed outline-1 outline-red-900 bg-stone-800"
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: '1/1',
        color: '#C5C3C1',
        backgroundColor: '#191A1C',
      }}
    >
      {isCovered ? <TileOverlay /> : null}
      {tileDisplayFromData(data)}
    </div>
  );
};
