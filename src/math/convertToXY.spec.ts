import { convertToXY } from './convertToXY';

describe('convertToXY', () => {
  test.each([
    { index: 0, width: 4, expected: { x: 0, y: 0 } },
    { index: 1, width: 3, expected: { x: 1, y: 0 } },
    { index: 1, width: 4, expected: { x: 1, y: 0 } },
    { index: 9, width: 4, expected: { x: 1, y: 2 } },
    { index: 3, width: 2, expected: { x: 1, y: 1 } },
    { index: 7, width: 3, expected: { x: 1, y: 2 } },
    { index: 3, width: 3, expected: { x: 0, y: 1 } },
    { index: 27, width: 9, expected: { x: 0, y: 3 } },
  ])(
    'convertToXY($index, $width) = $expected',
    ({ index, width, expected }) => {
      const actual = convertToXY(index, width);
      expect(actual).toStrictEqual(expected);
    }
  );
});
