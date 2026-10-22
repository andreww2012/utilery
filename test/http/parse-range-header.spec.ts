import {parseRangeHeader} from '../../src/http/parse-range-header.ts';

describe('http/parseRangeHeader', () => {
  it('parses ranges against the size', () => {
    expect(parseRangeHeader('bytes=0-499', 1000)).toStrictEqual({
      unit: 'bytes',
      ranges: [{start: 0, end: 499}],
    });
    expect(parseRangeHeader('bytes=-200', 1000)).toStrictEqual({
      unit: 'bytes',
      ranges: [{start: 800, end: 999}],
    });
    expect(parseRangeHeader('bytes=900-', 1000)).toStrictEqual({
      unit: 'bytes',
      ranges: [{start: 900, end: 999}],
    });
    expect(parseRangeHeader('bytes=500-5000', 1000)).toStrictEqual({
      unit: 'bytes',
      ranges: [{start: 500, end: 999}],
    });
  });

  it('combines ranges when asked', () => {
    expect(parseRangeHeader('bytes=0-1,2-3,10-20', 1000)?.valueOf()).toMatchObject({
      ranges: [
        {start: 0, end: 1},
        {start: 2, end: 3},
        {start: 10, end: 20},
      ],
    });
    expect(parseRangeHeader('bytes=0-1,2-3,10-20', 1000, {combine: true})).toStrictEqual({
      unit: 'bytes',
      ranges: [
        {start: 0, end: 3},
        {start: 10, end: 20},
      ],
    });
  });

  it('reports unsatisfiable and invalid headers', () => {
    expect(parseRangeHeader('bytes=2000-', 1000)).toBe('unsatisfiable');
    expect(parseRangeHeader('invalid', 1000)).toBeUndefined();
  });

  it('returns `undefined` for a missing header', () => {
    expect(parseRangeHeader(undefined, 1000)).toBeUndefined();
    expect(parseRangeHeader(null, 1000)).toBeUndefined();
    expect(parseRangeHeader('', 1000)).toBeUndefined();
  });
});
