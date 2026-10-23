// cspell:ignore stringifier
import {jsonStringifyLossless} from '../../src/json/json-stringify-lossless.ts';

// Writes a `Map` as the number that the number stringifier returns for it
const stringifyMapAs = (output: unknown) =>
  jsonStringifyLossless({price: new Map()}, null, undefined, [
    {test: (value) => value instanceof Map, stringify: () => output as string},
  ]);

describe('json/jsonStringifyLossless', () => {
  it('basic test', () => {
    expect(jsonStringifyLossless({big: 12345678901234567890n})).toBe(
      '{"big":12345678901234567890}',
    );
  });

  it('writes the JSON number that a number stringifier returns', () => {
    expect(stringifyMapAs('1.50')).toBe('{"price":1.50}');
  });

  it('throws when a number stringifier returns anything but a string with a JSON number', () => {
    expect(() => stringifyMapAs(undefined)).toThrow(Error);
    expect(() => stringifyMapAs(1.5)).toThrow(Error);
    expect(() => stringifyMapAs('one')).toThrow(Error);
  });
});
