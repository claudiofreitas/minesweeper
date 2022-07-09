import { convertToIndex } from './convertToIndex';

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
