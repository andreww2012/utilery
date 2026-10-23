import {toKebabCaseKeys} from '../../src/object/to-kebab-case-keys.ts';

describe('object/toKebabCaseKeys', () => {
  it('kebab-cases only the top-level keys', () => {
    expect(toKebabCaseKeys({fooBar: {bazQux: 1}})).toStrictEqual({'foo-bar': {bazQux: 1}});
  });

  it('converts a class instance like a plain object', () => {
    class Settings {}

    expect(toKebabCaseKeys(Object.assign(new Settings(), {fooBar: 1}))).toStrictEqual({
      'foo-bar': 1,
    });
  });

  it('returns arrays and built-in objects like dates and maps as they are', () => {
    const array = [{fooBar: 1}];
    const date = new Date(0);
    const map = new Map([['fooBar', 1]]);

    expect(toKebabCaseKeys(array)).toBe(array);
    expect(toKebabCaseKeys(date)).toBe(date);
    expect(toKebabCaseKeys(map)).toBe(map);
  });

  it('copies inherited enumerable keys too', () => {
    const object = Object.create({fooBar: 1}) as Record<string, number>;

    expect(toKebabCaseKeys(object)).toStrictEqual({'foo-bar': 1});
  });
});
