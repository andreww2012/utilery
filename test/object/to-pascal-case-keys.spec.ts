import {toPascalCaseKeys} from '../../src/object/to-pascal-case-keys.ts';

describe('object/toPascalCaseKeys', () => {
  it('converts only the top-level keys to PascalCase', () => {
    expect(toPascalCaseKeys({foo_bar: {baz_qux: 1}})).toStrictEqual({FooBar: {baz_qux: 1}});
  });

  it('converts a class instance like a plain object', () => {
    class Settings {}

    expect(toPascalCaseKeys(Object.assign(new Settings(), {foo_bar: 1}))).toStrictEqual({
      FooBar: 1,
    });
  });

  it('returns arrays and built-in objects like dates and maps as they are', () => {
    const array = [{foo_bar: 1}];
    const date = new Date(0);
    const map = new Map([['foo_bar', 1]]);

    expect(toPascalCaseKeys(array)).toBe(array);
    expect(toPascalCaseKeys(date)).toBe(date);
    expect(toPascalCaseKeys(map)).toBe(map);
  });

  it('copies inherited enumerable keys too', () => {
    const object = Object.create({foo_bar: 1}) as Record<string, number>;

    expect(toPascalCaseKeys(object)).toStrictEqual({FooBar: 1});
  });
});
