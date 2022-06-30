import { convertToIndex, convertToXY } from './createBoard';

describe('convertToIndex', () => {
  test.each([
    { x: 1, y: 0, w: 3, expectedIndex: 1 },
    { x: 1, y: 0, w: 4, expectedIndex: 1 },
    { x: 1, y: 2, w: 4, expectedIndex: 9 },
    { x: 1, y: 1, w: 2, expectedIndex: 3 },
    { x: 0, y: 1, w: 3, expectedIndex: 3 },
  ])(
    'convertToIndex($x, $y, $w) = $expectedIndex',
    ({ x, y, w, expectedIndex }) => {
      const index = convertToIndex(x, y, w);
      expect(index).toStrictEqual(expectedIndex);
    }
  );
});

describe('convertToXY', () => {
  test.each([
    { index: 0, width: 4, expected: { x: 0, y: 0 } },
    { index: 1, width: 3, expected: { x: 1, y: 0 } },
    { index: 1, width: 4, expected: { x: 1, y: 0 } },
    { index: 9, width: 4, expected: { x: 1, y: 2 } },
    { index: 3, width: 2, expected: { x: 1, y: 1 } },
    { index: 7, width: 3, expected: { x: 1, y: 2 } },
    { index: 3, width: 3, expected: { x: 0, y: 1 } },
  ])(
    'convertToXY($index, $width) = $expected',
    ({ index, width, expected }) => {
      const actual = convertToXY(index, width);
      expect(actual).toStrictEqual(expected);
    }
  );
});
