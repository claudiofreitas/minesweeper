type TileType = 'bomb' | 'land';
type LandTileState = 'covered' | 'flagged' | 'questioned' | 'discovered';
type BombTileState =
  | 'covered'
  | 'flagged'
  | 'questioned'
  | 'discovered'
  | 'exploded';

// type TileState<T extends TileType> = T extends 'bomb'
//   ? BombTileState
//   : T extends 'land'
//   ? LandTileState
//   : never;

type TileDataCommon = {
  x: number;
  y: number;
  bombsAround: number;
};
type TileDataBomb = {
  type: 'bomb';
  state: BombTileState;
};
type TileDataLand = {
  type: 'land';
  state: LandTileState;
};
export type TileData = TileDataCommon & (TileDataBomb | TileDataLand);

// TODO: improve type above
// Would be best if the code below didn't offer the option 'exploded' for type 'land'
// const tile: TileData = {
//   x: 0,
//   y: 0,
//   bombsAround: 0,
//   type: 'land',
//   state: 'exploded',
// };
