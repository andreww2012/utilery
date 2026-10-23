import {toCamelCaseKeys} from '../../src/object/to-camel-case-keys.ts';

describe('object/toCamelCaseKeys', () => {
  it('camel-cases only the top-level keys', () => {
    expect(toCamelCaseKeys({foo_bar: {baz_qux: 1}})).toStrictEqual({fooBar: {baz_qux: 1}});
  });

  it('converts a class instance like a plain object', () => {
    class Settings {}

    expect(toCamelCaseKeys(Object.assign(new Settings(), {foo_bar: 1}))).toStrictEqual({
      fooBar: 1,
    });
  });

  it('returns arrays and built-in objects like dates and maps as they are', () => {
    const array = [{foo_bar: 1}];
    const date = new Date(0);
    const map = new Map([['foo_bar', 1]]);

    expect(toCamelCaseKeys(array)).toBe(array);
    expect(toCamelCaseKeys(date)).toBe(date);
    expect(toCamelCaseKeys(map)).toBe(map);
  });

  it('copies inherited enumerable keys too', () => {
    const object = Object.create({foo_bar: 1}) as Record<string, number>;

    expect(toCamelCaseKeys(object)).toStrictEqual({fooBar: 1});
  });
});
