import {NumberLossless} from '../../src/json/index.ts';
import {jsonParseLossless} from '../../src/json/json-parse-lossless.ts';

describe('json/jsonParseLossless', () => {
  it('basic test', () => {
    const parsed = jsonParseLossless('{"big": 12345678901234567890}') as {big: NumberLossless};

    expect(parsed.big).toBeInstanceOf(NumberLossless);
    expect(parsed.big.toString()).toBe('12345678901234567890');
  });

  it('throws from `NumberLossless#valueOf` for a number that does not fit in a `number`', () => {
    expect(() => new NumberLossless('1e500').valueOf()).toThrow(Error);
    expect(() => new NumberLossless('1e-500').valueOf()).toThrow(Error);
  });
});
