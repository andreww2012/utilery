import {toDelimiterCaseKeys} from '../../src/object/to-delimiter-case-keys.ts';

describe('object/toDelimiterCaseKeys', () => {
  it('delimiter-cases only the top-level keys, preserving case', () => {
    expect(toDelimiterCaseKeys({fooBar: {bazQux: 1}}, '.')).toStrictEqual({
      'foo.Bar': {bazQux: 1},
    });
  });

  it('converts a class instance like a plain object', () => {
    class Settings {}

    expect(toDelimiterCaseKeys(Object.assign(new Settings(), {fooBar: 1}), '.')).toStrictEqual({
      'foo.Bar': 1,
    });
  });

  it('returns arrays and built-in objects like dates and maps as they are', () => {
    const array = [{fooBar: 1}];
    const date = new Date(0);
    const map = new Map([['fooBar', 1]]);

    expect(toDelimiterCaseKeys(array, '.')).toBe(array);
    expect(toDelimiterCaseKeys(date, '.')).toBe(date);
    expect(toDelimiterCaseKeys(map, '.')).toBe(map);
  });

  it('copies inherited enumerable keys too', () => {
    const object = Object.create({fooBar: 1}) as Record<string, number>;

    expect(toDelimiterCaseKeys(object, '.')).toStrictEqual({'foo.Bar': 1});
  });
});
